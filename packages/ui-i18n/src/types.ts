/**
 * Translation types for WaysNX UI Kit
 */

/** All translatable string keys used across ui-core */
export interface UICoreMessages {
  // Validation messages
  'validation.required': string;
  'validation.email': string;
  'validation.pattern': string;
  'validation.minLength': string;
  'validation.maxLength': string;
  'validation.min': string;
  'validation.max': string;
  'validation.enum': string;
  'validation.minSelected': string;
  'validation.maxSelected': string;
  'validation.matchWith': string;

  // Input component
  'input.showPassword': string;
  'input.hidePassword': string;

  // FileUpload component
  'fileUpload.browse': string;
  'fileUpload.dropHere': string;
  'fileUpload.accepted': string;
  'fileUpload.maxSize': string;
  'fileUpload.uploading': string;
  'fileUpload.uploaded': string;
  'fileUpload.uploadFailed': string;
  'fileUpload.readyToUpload': string;
  'fileUpload.upload': string;
  'fileUpload.remove': string;
  'fileUpload.fileTooLarge': string;
  'fileUpload.fileTypeNotAccepted': string;
  'fileUpload.lastModified': string;
  'fileUpload.deleteConfirm': string;
  'fileUpload.uploadedFiles': string;
  'fileUpload.uploadedFilesRegion': string;

  // DatePicker / TimePicker
  'datePicker.selectDate': string;
  'datePicker.selectTime': string;
  'datePicker.clear': string;

  // Select / Autocomplete
  'select.placeholder': string;
  'select.noOptions': string;
  'select.loadingOptions': string;
  'select.selectAll': string;
  'select.search': string;

  // General
  'general.loading': string;
  'general.error': string;
  'general.close': string;
  'general.cancel': string;
  'general.confirm': string;
  'general.save': string;
  'general.delete': string;
  'general.edit': string;
  'general.add': string;
  'general.remove': string;
  'general.search': string;
  'general.clear': string;
  'general.noResults': string;
}

/** Translatable keys for ui-form-builder */
export interface UIFormBuilderMessages {
  'formBuilder.loading': string;
  'formBuilder.loadFailed': string;
  'formBuilder.fixErrors': string;
  'formBuilder.dismissInfo': string;
  'formBuilder.submit': string;
  'formBuilder.reset': string;
}

/** Translatable keys for ui-grid-builder */
export interface UIGridBuilderMessages {
  'grid.rowsPerPage': string;
  'grid.of': string;
  'grid.records': string;
  'grid.noRecords': string;
  'grid.rowsSelected': string;
  'grid.clear': string;
  'grid.searchAllColumns': string;
  'grid.clearSearch': string;
  'grid.totalRecords': string;
  'grid.columns': string;
  'grid.noData': string;
  'grid.actions': string;
}

/** Translatable keys for ui-layout */
export interface UILayoutMessages {
  'wizard.next': string;
  'wizard.previous': string;
  'wizard.skip': string;
  'wizard.finish': string;
  'wizard.saveContinueLater': string;
  'wizard.validating': string;
  'wizard.stepOf': string;
}

/** Translatable keys for ui-feedback */
export interface UIFeedbackMessages {
  'modal.close': string;
  'confirm.confirm': string;
  'confirm.cancel': string;
  'toast.close': string;
  'toast.successNotification': string;
  'toast.errorNotification': string;
  'toast.infoNotification': string;
  'toast.warningNotification': string;
  'drawer.close': string;
}

/** Translatable keys for ui-navigation */
export interface UINavigationMessages {
  'navigation.skipToContent': string;
  'navigation.toggleSidebar': string;
  'navigation.closeSidebar': string;
  'navigation.openMenu': string;
  'navigation.closeMenu': string;
  'navigation.moreActions': string;
  'navigation.search': string;
  'navigation.searchPlaceholder': string;
  'navigation.noResults': string;
  'navigation.noCommands': string;
  'navigation.commandPalettePlaceholder': string;
  'navigation.closeDrawer': string;
  'navigation.back': string;
  'navigation.home': string;
  'navigation.favorites': string;
  'navigation.noFavorites': string;
  'navigation.recentItems': string;
  'navigation.noRecentItems': string;
  'navigation.clearRecent': string;
  'navigation.notifications': string;
  'navigation.noNotifications': string;
  'navigation.markAsRead': string;
  'navigation.markAllAsRead': string;
  'navigation.workspace': string;
  'navigation.switchWorkspace': string;
  'navigation.stepOf': string;
}

/** Translatable keys for ui-dashboard */
export interface UIDashboardMessages {
  'dashboard.skipToContent': string;
  'dashboard.loading': string;
  'dashboard.loadingMessage': string;
  'dashboard.empty': string;
  'dashboard.emptyMessage': string;
  'dashboard.error': string;
  'dashboard.errorMessage': string;
  'dashboard.offline': string;
  'dashboard.offlineMessage': string;
  'dashboard.permissionDenied': string;
  'dashboard.permissionDeniedMessage': string;
  'dashboard.tryAgain': string;
  'dashboard.refresh': string;
  'dashboard.export': string;
  'dashboard.exportPNG': string;
  'dashboard.exportPDF': string;
  'dashboard.exportCSV': string;
  'dashboard.exportExcel': string;
  'dashboard.print': string;
  'dashboard.fullscreen': string;
  'dashboard.exitFullscreen': string;
  'dashboard.target': string;
}

/** Translatable keys for ui-communication */
export interface UICommunicationMessages {
  'communication.typing.single': string;
  'communication.typing.multiple': string;
  'communication.typing.many': string;
  'communication.presence.online': string;
  'communication.presence.away': string;
  'communication.presence.busy': string;
  'communication.presence.offline': string;
  'communication.message.deleted': string;
  'communication.message.edited': string;
  'communication.message.failed': string;
  'communication.message.retry': string;
  'communication.receipts.sending': string;
  'communication.receipts.sent': string;
  'communication.receipts.delivered': string;
  'communication.receipts.read': string;
  'communication.receipts.seenBy': string;
  'communication.thread.replies': string;
  'communication.thread.reply': string;
  'communication.thread.replyInThread': string;
  'communication.input.placeholder': string;
  'communication.input.attachFile': string;
  'communication.input.addEmoji': string;
  'communication.input.mention': string;
  'communication.input.voiceMessage': string;
  'communication.input.send': string;
  'communication.search.placeholder': string;
  'communication.search.noResults': string;
  'communication.search.fromFilter': string;
  'communication.search.typeFilter': string;
  'communication.conversations.search': string;
  'communication.conversations.empty': string;
  'communication.conversations.all': string;
  'communication.conversations.unread': string;
  'communication.conversations.mentions': string;
  'communication.notifications.title': string;
  'communication.notifications.markAllRead': string;
  'communication.notifications.empty': string;
  'communication.emoji.search': string;
  'communication.emoji.recent': string;
  'communication.upload.dropHere': string;
  'communication.upload.browse': string;
}

/** Translatable keys for ui-maps, ui-media, ui-files, ui-data */
export interface UIMapsMessages {
  'maps.noAdapter': string;
  'maps.connectAdapter': string;
  'maps.satellite': string;
  'maps.roadmap': string;
  'maps.address.search': string;
  'maps.address.useCurrentLocation': string;
  'maps.address.searching': string;
  'maps.distance.from': string;
  'maps.distance.to': string;
  'maps.distance.calculate': string;
  'maps.route.getDirections': string;
  'maps.route.totalDistance': string;
  'maps.route.totalDuration': string;
}

export interface UIMediaMessages {
  'media.qr.download': string;
  'media.barcode.download': string;
  'media.scanner.scanning': string;
  'media.scanner.paused': string;
  'media.scanner.start': string;
  'media.scanner.stop': string;
  'media.signature.clear': string;
  'media.signature.save': string;
  'media.signature.verified': string;
  'media.signature.download': string;
  'media.ocr.dropHere': string;
  'media.ocr.browse': string;
  'media.ocr.extractedText': string;
  'media.ocr.copy': string;
  'media.cropper.crop': string;
  'media.cropper.free': string;
  'media.colorPicker.copy': string;
}

export interface UIFilesMessages {
  'files.pdf.page': string;
  'files.pdf.of': string;
  'files.pdf.zoomIn': string;
  'files.pdf.zoomOut': string;
}

export interface UIDataMessages {
  'data.editor.copy': string;
}

/** Translatable keys for ui-visualization */
export interface UIVisualizationMessages {
  // Canvas
  'visualization.canvas.ariaLabel': string;
  'visualization.orgChart.ariaLabel': string;
  'visualization.tree.ariaLabel': string;
  'visualization.hierarchy.ariaLabel': string;

  // Node
  'visualization.node.expand': string;
  'visualization.node.collapse': string;
  'visualization.node.badge': string;

  // Toolbar
  'visualization.toolbar.ariaLabel': string;
  'visualization.toolbar.zoomIn': string;
  'visualization.toolbar.zoomOut': string;
  'visualization.toolbar.fitView': string;
  'visualization.toolbar.resetZoom': string;
  'visualization.toolbar.expandAll': string;
  'visualization.toolbar.collapseAll': string;
  'visualization.toolbar.exportPng': string;
  'visualization.toolbar.exportSvg': string;

  // ZoomControls
  'visualization.zoom.zoomIn': string;
  'visualization.zoom.zoomOut': string;
  'visualization.zoom.fitView': string;
  'visualization.zoom.current': string;

  // SearchBox
  'visualization.search.placeholder': string;
  'visualization.search.noResults': string;
  'visualization.search.resultCount': string;
  'visualization.search.prev': string;
  'visualization.search.next': string;
  'visualization.search.clear': string;
  'visualization.search.ariaLabel': string;

  // MiniMap
  'visualization.minimap.ariaLabel': string;

  // Legend
  'visualization.legend.title': string;
}

/** Translatable keys for ui-accessibility */
export interface UIAccessibilityMessages {
  'accessibility.title': string;
  'accessibility.settings': string;
  'accessibility.currentProfile': string;
  'accessibility.profiles': string;
  'accessibility.quickActions': string;
  'accessibility.score': string;
  'accessibility.openSettings': string;
  'accessibility.closeSettings': string;
  'accessibility.toggleSettings': string;
  'accessibility.resetAll': string;
  'accessibility.applyProfile': string;
  'accessibility.profile.lowVision': string;
  'accessibility.profile.dyslexia': string;
  'accessibility.profile.adhd': string;
  'accessibility.profile.motorDisabilities': string;
  'accessibility.profile.blind': string;
  'accessibility.profile.deuteranopia': string;
  'accessibility.profile.protanopia': string;
  'accessibility.profile.tritanopia': string;
  'accessibility.profile.elderly': string;
  'accessibility.profile.seizureSafe': string;
  'accessibility.profile.lowVision.description': string;
  'accessibility.profile.dyslexia.description': string;
  'accessibility.profile.adhd.description': string;
  'accessibility.profile.motorDisabilities.description': string;
  'accessibility.profile.blind.description': string;
  'accessibility.profile.deuteranopia.description': string;
  'accessibility.profile.protanopia.description': string;
  'accessibility.profile.tritanopia.description': string;
  'accessibility.profile.elderly.description': string;
  'accessibility.profile.seizureSafe.description': string;
  'accessibility.setting.textSize': string;
  'accessibility.setting.textSpacing': string;
  'accessibility.setting.font': string;
  'accessibility.setting.contrast': string;
  'accessibility.setting.colorFilters': string;
  'accessibility.setting.focusMode': string;
  'accessibility.setting.readingGuide': string;
  'accessibility.setting.highlightLinks': string;
  'accessibility.setting.reducedMotion': string;
  'accessibility.setting.screenReaderOptimization': string;
  'accessibility.setting.keyboardShortcuts': string;
  'accessibility.option.normal': string;
  'accessibility.option.large': string;
  'accessibility.option.xLarge': string;
  'accessibility.option.xxLarge': string;
  'accessibility.option.loose': string;
  'accessibility.option.extraLoose': string;
  'accessibility.option.default': string;
  'accessibility.option.dyslexiaFriendly': string;
  'accessibility.option.high': string;
  'accessibility.option.yellowBlack': string;
  'accessibility.option.none': string;
  'accessibility.option.grayscale': string;
  'accessibility.option.standard': string;
  'accessibility.option.highVisibility': string;
  'accessibility.option.boxOutline': string;
  'accessibility.aria.openAccessibilitySettings': string;
  'accessibility.aria.closeAccessibilitySettings': string;
  'accessibility.aria.toggleAccessibilitySettings': string;
  'accessibility.aria.readingGuide': string;
  'accessibility.aria.magnifier': string;
  'accessibility.aria.accessibilityCenter': string;
  'accessibility.message.settingUpdated': string;
  'accessibility.message.profileApplied': string;
  'accessibility.message.settingsReset': string;
  'accessibility.skipLinks.nav': string;
}

/** Translatable keys for ui-docs */
export interface UIDocsMessages {
  'docs.noProps': string;
  'docs.componentProps': string;
  'docs.copy': string;
  'docs.copied': string;
  'docs.selectExample': string;
  'docs.noDemos': string;
  'docs.examples': string;
  'docs.metadata': string;
  'docs.comingSoon': string;
  'docs.required': string;
  'docs.deprecated': string;
  'docs.source': string;
  'docs.confidence': string;
  'docs.keywords': string;
  'docs.code': string;
  'docs.props': string;
}

/** Combined message type for all packages */
export type AllMessages = UICoreMessages &
  UIFormBuilderMessages &
  UIGridBuilderMessages &
  UILayoutMessages &
  UIFeedbackMessages &
  UINavigationMessages &
  UIDashboardMessages &
  UICommunicationMessages &
  UIMapsMessages &
  UIMediaMessages &
  UIFilesMessages &
  UIDataMessages &
  UIVisualizationMessages &
  UIAccessibilityMessages &
  UIDocsMessages;

/** Partial messages — consumers only need to override what they want */
export type TranslationMessages = Partial<AllMessages>;

/** Configuration for the TranslationProvider */
export interface TranslationConfig {
  /** Active locale code (e.g., 'en', 'es', 'fr') */
  locale: string;
  /** Custom messages to override defaults */
  messages?: TranslationMessages;
  /** Text direction */
  direction?: 'ltr' | 'rtl';
}
