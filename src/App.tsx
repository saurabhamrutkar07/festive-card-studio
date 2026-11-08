import { useCallback, useRef, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { TemplateGallery } from './components/TemplateGallery';
import { CardFormatSelector } from './components/CardFormatSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { WishSelector } from './components/WishSelector';
import { PersonalisationForm } from './components/PersonalisationForm';
import { LiveCardPreview } from './components/LiveCardPreview';
import { LogoUploader } from './components/LogoUploader';
import { DownloadButton } from './components/DownloadButton';
import { WhatsAppShareButton } from './components/WhatsAppShareButton';
import { ShareDialog, type ShareDialogState } from './components/ShareDialog';
import { SectionHeader } from './components/SectionHeader';
import { Toast, type ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { formatSenderName, useCardGenerator } from './hooks/useCardGenerator';
import { useCardExport } from './hooks/useCardExport';
import { downloadBlob } from './utils/imageExport';
import { buildCardFilename } from './utils/filename';
import { buildWhatsAppUrl, canShareImageFile, isMobileDevice, shareImageFile } from './utils/whatsappShare';
import { t } from './data/translations';

const focusField = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => (el as HTMLInputElement).focus({ preventScroll: true }), 350);
};

export default function App() {
  const card = useCardGenerator();
  const cardRef = useRef<HTMLDivElement>(null);
  const { busy, generate } = useCardExport(cardRef, card.format);
  const [nameError, setNameError] = useState<string>();
  const [messageError, setMessageError] = useState<string>();
  const [exportError, setExportError] = useState<string>();
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [dialog, setDialog] = useState<ShareDialogState | null>(null);

  const notify = useCallback((kind: ToastMessage['kind'], text: string) => setToast({ id: Date.now(), kind, text }), []);
  const dismissToast = useCallback(() => setToast(null), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const filename = buildCardFilename(card.sender.name, card.sender.familyName);
  const shareText = `${card.shareMessage}\n\n— ${formatSenderName(card.sender, card.language)}`;

  const validate = (): boolean => {
    if (!card.sender.name.trim()) {
      setNameError('Please enter your name — it will appear on your card.');
      notify('error', 'Add your name before downloading or sharing your card.');
      focusField('sender-name');
      return false;
    }
    if (card.messageIsEmpty) {
      setMessageError('Please write a message or choose one of the predefined wishes.');
      notify('error', 'Your card needs a greeting message.');
      focusField(card.messageMode === 'custom' ? 'custom-message' : 'preset-editor');
      return false;
    }
    return true;
  };

  const exportFailed = (err: unknown) => {
    console.error(err);
    const msg = 'Sorry, we could not create the image. Please try again — if it keeps failing, try another browser (Chrome, Safari or Edge).';
    setExportError(msg);
    notify('error', msg);
  };

  const handleDownload = async () => {
    setExportError(undefined);
    if (!validate()) return;
    try {
      const blob = await generate('download');
      downloadBlob(blob, filename);
      notify('success', `Downloaded ${filename}`);
    } catch (err) {
      exportFailed(err);
    }
  };

  const fallbackToManual = (blob: Blob) => {
    downloadBlob(blob, filename);
    setDialog({ kind: 'manual', filename, whatsappUrl: buildWhatsAppUrl(shareText), mobile: isMobileDevice() });
  };

  const handleShare = async () => {
    setExportError(undefined);
    if (!validate()) return;
    let blob: Blob;
    try {
      blob = await generate('share');
    } catch (err) {
      exportFailed(err);
      return;
    }
    const file = new File([blob], filename, { type: 'image/png' });
    if (!canShareImageFile(file)) {
      fallbackToManual(blob);
      return;
    }
    const title = t(card.language).headingShort;
    const result = await shareImageFile(file, shareText, title);
    if (result === 'shared') notify('success', 'Your card was shared. Happy Diwali!');
    else if (result === 'unsupported') fallbackToManual(blob);
    else if (result === 'needs-gesture') {
      setDialog({
        kind: 'retry',
        filename,
        whatsappUrl: buildWhatsAppUrl(shareText),
        onShare: async () => {
          setDialog(null);
          const retry = await shareImageFile(file, shareText, title);
          if (retry === 'shared') notify('success', 'Your card was shared. Happy Diwali!');
          else if (retry !== 'cancelled') fallbackToManual(blob);
        },
        onFallback: () => fallbackToManual(blob),
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar language={card.language} onLanguageChange={card.setLanguage} />
      <main>
        <HeroSection language={card.language} />
        <HowItWorks />

        <section id="create" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-400/80">Card Studio</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">Design your Diwali greeting</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-100/60">Every change appears instantly in the live preview.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0 space-y-6">
              <div id="designs" className="panel scroll-mt-20">
                <SectionHeader step={1} title="Choose a design" subtitle="12 handcrafted templates · pick your card size" />
                <div className="mb-5">
                  <CardFormatSelector value={card.format} onChange={card.setFormat} />
                </div>
                <TemplateGallery selectedId={card.templateId} language={card.language} onSelect={card.setTemplateId} />
              </div>

              <div id="wishes" className="panel scroll-mt-20">
                <SectionHeader step={2} title="Choose your wish" subtitle="32 heartfelt wishes in 8 categories" />
                <div className="mb-4">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-cream-100/50">Card language</span>
                  <LanguageSelector value={card.language} onChange={card.setLanguage} />
                </div>
                <WishSelector
                  language={card.language}
                  mode={card.messageMode}
                  onModeChange={(m) => {
                    setMessageError(undefined);
                    card.setMessageMode(m);
                  }}
                  category={card.wishCategory}
                  onCategoryChange={card.setWishCategory}
                  wishes={card.visibleWishes}
                  selectedId={card.selectedWishId}
                  onSelect={(id) => {
                    setMessageError(undefined);
                    card.selectWish(id);
                  }}
                  onRandom={() => {
                    setMessageError(undefined);
                    card.randomWish();
                  }}
                  presetText={card.presetText}
                  isPresetEdited={card.isPresetEdited}
                  onEditPreset={(v) => {
                    setMessageError(undefined);
                    card.editPreset(v);
                  }}
                  onResetPreset={card.resetPreset}
                  customMessage={card.customMessage}
                  onCustomChange={(v) => {
                    setMessageError(undefined);
                    card.setCustomMessage(v);
                  }}
                  error={messageError}
                />
              </div>

              <div id="personalise" className="panel scroll-mt-20">
                <SectionHeader step={3} title="Personalise" subtitle="Add your name and style the text" />
                <PersonalisationForm
                  sender={card.sender}
                  onSenderChange={(k, v) => {
                    if (k === 'name' && v.trim()) setNameError(undefined);
                    card.updateSender(k, v);
                  }}
                  textStyle={card.textStyle}
                  onStyleChange={card.updateTextStyle}
                  onResetStyle={card.resetTextStyle}
                  senderPreview={card.content.senderName}
                  senderIntroPreview={card.content.senderIntro}
                  nameError={nameError}
                />
              </div>

              <div id="branding" className="panel scroll-mt-20">
                <SectionHeader step={4} title="Add your logo" subtitle="Optional · brand your greetings for clients and customers" />
                <LogoUploader logo={card.logo} onChange={card.updateLogo} onRemove={card.removeLogo} />
              </div>
            </div>

            <div className="min-w-0 lg:sticky lg:top-20">
              <LiveCardPreview ref={cardRef} templateId={card.templateId} format={card.format} content={card.content} style={card.textStyle}
                logo={card.logo}
              >
                <div className="mt-5 space-y-3">
                  <DownloadButton onClick={handleDownload} loading={busy === 'download'} disabled={!!busy} />
                  <WhatsAppShareButton onClick={handleShare} loading={busy === 'share'} disabled={!!busy} />
                  {exportError ? (
                    <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-500/10 p-3 text-xs text-red-200">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {exportError}
                    </p>
                  ) : (
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-cream-100/45">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        Saves as <span className="break-all font-medium text-cream-100/70">{filename}</span>. On phones, sharing opens your share
                        menu so you can send the image straight to WhatsApp.
                      </span>
                    </p>
                  )}
                </div>
              </LiveCardPreview>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ShareDialog state={dialog} onClose={closeDialog} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
