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
import { FireworksSelector } from './components/FireworksSelector';
import { ModeSwitch } from './components/ModeSwitch';
import { OccasionPicker } from './components/OccasionPicker';
import { getOccasion } from './data/occasions';
import { templatesFor } from './data/templates';
import { wishesForOccasion } from './data/wishes';
import { exportMime, type ExportKind, type ExportPurpose } from './hooks/useCardExport';
import { DownloadButton } from './components/DownloadButton';
import { WhatsAppShareButton } from './components/WhatsAppShareButton';
import { ShareDialog, type ShareDialogState } from './components/ShareDialog';
import { SectionHeader } from './components/SectionHeader';
import { Toast, type ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { ContactSection } from './components/ContactSection';
import { formatSenderName, useCardGenerator } from './hooks/useCardGenerator';
import { useCardExport } from './hooks/useCardExport';
import { downloadBlob } from './utils/imageExport';
import { buildCardFilename } from './utils/filename';
import { buildWhatsAppUrl, canShareImageFile, isMobileDevice, shareImageFile } from './utils/whatsappShare';

const focusField = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => (el as HTMLInputElement).focus({ preventScroll: true }), 350);
};

export default function App() {
  const card = useCardGenerator();
  const cardRef = useRef<HTMLDivElement>(null);
  const { busy, progress, generate } = useCardExport(cardRef, card.format);
  const [nameError, setNameError] = useState<string>();
  const [messageError, setMessageError] = useState<string>();
  const [exportError, setExportError] = useState<string>();
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [dialog, setDialog] = useState<ShareDialogState | null>(null);

  const notify = useCallback((kind: ToastMessage['kind'], text: string) => setToast({ id: Date.now(), kind, text }), []);
  const dismissToast = useCallback(() => setToast(null), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const isBusiness = card.mode === 'business';
  const occasionEffectMeta = getOccasion(card.occasion).effect;
  const designCount = templatesFor(card.mode, card.occasion).length;
  const filename = buildCardFilename(
    isBusiness ? card.business.name.trim() : card.sender.name.trim() ? formatSenderName(card.sender, 'en', card.occasion) : '',
    card.filePrefix,
  );
  const shareText = `${card.shareMessage}\n\n— ${card.signature || card.content.senderName}`;

  const validate = (): boolean => {
    if (!card.signature) {
      setNameError(isBusiness ? 'Please enter your business name — it will appear on your card.' : 'Please enter your name — it will appear on your card.');
      notify('error', isBusiness ? 'Add your business name before downloading or sharing.' : 'Add your name before downloading or sharing your card.');
      focusField(isBusiness ? 'business-name' : 'sender-name');
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

  /** With fireworks on, the main download/share is an animated GIF (autoplays in chats). */
  /** Fireworks or the occasion animation make the card export as an animated GIF. */
  const animated = card.fireworks !== 'off' || card.effect !== null;
  const fileFor = (kind: ExportKind) => filename.replace(/\.png$/, `.${kind}`);

  const exportFailed = (err: unknown, kind: ExportKind) => {
    console.error(err);
    const what = kind === 'png' ? 'image' : 'animated card';
    const msg =
      err instanceof Error && err.message.includes('browser')
        ? err.message
        : `Sorry, we could not create the ${what}. Please try again — if it keeps failing, try another browser (Chrome, Safari or Edge).`;
    setExportError(msg);
    notify('error', msg);
  };

  const handleDownload = async (purpose: ExportPurpose, kind: ExportKind) => {
    setExportError(undefined);
    if (!validate()) return;
    try {
      const blob = await generate(purpose, kind);
      downloadBlob(blob, fileFor(kind));
      notify('success', `Downloaded ${fileFor(kind)}`);
    } catch (err) {
      exportFailed(err, kind);
    }
  };

  const handleShare = async () => {
    setExportError(undefined);
    if (!validate()) return;
    const kind: ExportKind = animated ? 'gif' : 'png';
    const shareName = fileFor(kind);
    let blob: Blob;
    try {
      blob = await generate('share', kind);
    } catch (err) {
      exportFailed(err, kind);
      return;
    }
    const fallbackToManual = (b: Blob) => {
      downloadBlob(b, shareName);
      setDialog({ kind: 'manual', filename: shareName, whatsappUrl: buildWhatsAppUrl(shareText), mobile: isMobileDevice() });
    };
    const file = new File([blob], shareName, { type: exportMime(kind) });
    if (!canShareImageFile(file)) {
      fallbackToManual(blob);
      return;
    }
    const title = card.headingShort;
    const result = await shareImageFile(file, shareText, title);
    if (result === 'shared') notify('success', `Your card was shared. ${card.headingShort}!`);
    else if (result === 'unsupported') fallbackToManual(blob);
    else if (result === 'needs-gesture') {
      setDialog({
        kind: 'retry',
        filename: shareName,
        whatsappUrl: buildWhatsAppUrl(shareText),
        onShare: async () => {
          setDialog(null);
          const retry = await shareImageFile(file, shareText, title);
          if (retry === 'shared') notify('success', `Your card was shared. ${card.headingShort}!`);
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
            <h2 className="mt-2 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">Design your {card.occasionLabel} greeting</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-100/60">Every change appears instantly in the live preview.</p>
            <div className="mt-6 space-y-4">
              <OccasionPicker occasion={card.occasion} name={card.occasionName} onOccasionChange={card.setOccasion} onNameChange={card.setOccasionName} />
              <ModeSwitch
                value={card.mode}
                onChange={(m) => {
                  setNameError(undefined);
                  card.setMode(m);
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0 space-y-6">
              <div id="designs" className="panel scroll-mt-20">
                <SectionHeader
                  step={1}
                  title="Choose a design"
                  subtitle={
                    isBusiness
                      ? `${designCount} business designs built around your logo · pick your card size`
                      : `${designCount} ${card.occasionLabel} designs · pick your card size`
                  }
                />
                <div className="mb-5">
                  <CardFormatSelector value={card.format} onChange={card.setFormat} />
                </div>
                <TemplateGallery
                  key={`${card.mode}:${card.occasion}`}
                  mode={card.mode}
                  occasion={card.occasion}
                  selectedId={card.templateId}
                  language={card.language}
                  onSelect={card.setTemplateId}
                />
                <div className="mt-5">
                  <FireworksSelector
                    value={card.fireworks}
                    onChange={card.setFireworks}
                    animated={animated}
                    occasionEffect={
                      occasionEffectMeta ? { label: occasionEffectMeta.label, on: card.occasionEffectOn, onToggle: card.setOccasionEffectOn } : undefined
                    }
                  />
                </div>
              </div>

              <div id="wishes" className="panel scroll-mt-20">
                <SectionHeader
                  step={2}
                  title="Choose your wish"
                  subtitle={`${wishesForOccasion(card.occasion).length} heartfelt ${card.occasionLabel} wishes in ${card.wishCategories.length} categories`}
                />
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
                  categories={card.wishCategories}
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
                <SectionHeader
                  step={3}
                  title={isBusiness ? 'Business details' : 'Personalise'}
                  subtitle={isBusiness ? 'Your business name, tagline and contact line' : 'Add your name and style the text'}
                />
                <PersonalisationForm
                  mode={card.mode}
                  business={card.business}
                  onBusinessChange={(k, v) => {
                    if (k === 'name' && v.trim()) setNameError(undefined);
                    card.updateBusiness(k, v);
                  }}
                  sender={card.sender}
                  onSenderChange={(k, v) => {
                    if (k === 'name' && v.trim()) setNameError(undefined);
                    card.updateSender(k, v);
                  }}
                  onSignAsChange={card.setSignAs}
                  occasion={card.occasion}
                  textStyle={card.textStyle}
                  onStyleChange={card.updateTextStyle}
                  onResetStyle={card.resetTextStyle}
                  senderPreview={card.content.senderName}
                  senderIntroPreview={card.content.senderIntro}
                  nameError={nameError}
                />
              </div>

              {/* Logos are a Business-mode feature for now; personal cards stay logo-free. */}
              {isBusiness && (
                <div id="branding" className="panel scroll-mt-20">
                  <SectionHeader step={4} title="Your logo" subtitle="The centrepiece of every business design" />
                  <LogoUploader mode={card.mode} logo={card.logo} onChange={card.updateLogo} onRemove={card.removeLogo} />
                </div>
              )}
            </div>

            <div className="min-w-0 lg:sticky lg:top-20">
              <LiveCardPreview ref={cardRef} templateId={card.templateId} format={card.format} content={card.content} style={card.textStyle}
                logo={isBusiness ? card.logo : undefined}
                fireworks={card.fireworks}
                effect={card.effect}
              >
                <div className="mt-5 space-y-3">
                  <DownloadButton
                    onClick={() => handleDownload('download', animated ? 'gif' : 'png')}
                    loading={busy === 'download'}
                    disabled={!!busy}
                    label={animated ? 'Download Animated Card' : undefined}
                    loadingLabel={animated ? `Creating animation… ${Math.round(progress * 100)}%` : undefined}
                    progress={animated ? progress : undefined}
                  />
                  <WhatsAppShareButton
                    onClick={handleShare}
                    loading={busy === 'share'}
                    disabled={!!busy}
                    loadingLabel={animated ? `Preparing animation… ${Math.round(progress * 100)}%` : undefined}
                  />
                  {animated && (
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-cream-100/55">
                      <span>Prefer a still picture?</span>
                      <button
                        type="button"
                        disabled={!!busy}
                        onClick={() => handleDownload('still', 'png')}
                        className="font-medium text-gold-300 underline-offset-2 hover:underline disabled:opacity-50"
                      >
                        {busy === 'still' ? 'Creating…' : 'Download image (PNG)'}
                      </button>
                    </div>
                  )}
                  {exportError ? (
                    <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-500/10 p-3 text-xs text-red-200">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {exportError}
                    </p>
                  ) : (
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-cream-100/45">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        Saves as <span className="break-all font-medium text-cream-100/70">{fileFor(animated ? 'gif' : 'png')}</span>.{' '}
                        {animated
                          ? 'The animated card plays by itself in WhatsApp chats and photo galleries — no need to open it.'
                          : 'On phones, sharing opens your share menu so you can send the image straight to WhatsApp.'}
                      </span>
                    </p>
                  )}
                </div>
              </LiveCardPreview>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <ShareDialog state={dialog} onClose={closeDialog} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
