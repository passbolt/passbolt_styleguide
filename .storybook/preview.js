import React from 'react';
import AppContext from '../src/shared/context/AppContext/AppContext';
import MockTranslationProvider from "../src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

// Mock jest.fn to be able to use jest test data mock in storybook.
// The benefit is too be able to keep consistent any changes on the Component props in order to keep the storybook stable.
window.jest = {
  fn: arg => () => arg
};

const withLocalProvider = (Story, context) =>
  <MockTranslationProvider language={context.globals.locale}>
    <Story/>
  </MockTranslationProvider>;

const defaultContext = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: process.env.ORIGIN_URL,
      }
    }
  },
  trustedDomain: process.env.ORIGIN_URL,
};

const withAppContextProvider = (Story) =>
  <AppContext.Provider value={defaultContext}>
    <Story/>
  </AppContext.Provider>;

function withStylesheet(Story, context) {
  const themeName = context.globals.themes || "default";
  const css = context.parameters.css || "ext_app";

  return (
    <>
      <link rel="stylesheet" href={`css/themes/${themeName}/${css}.css`}/>
      <Story/>
    </>
  );
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-UK',
    toolbar: {
      icon: 'globe',
      items: [
        //TODO: this might be improve to dynamically generate the language list
        { value: 'de-DE', right: '🇩🇪', title: 'Deutsch' },
        { value: 'en-UK', right: '🇬🇧', title: 'English' },
        { value: 'es-ES', right: '🇪🇸', title: 'Español' },
        { value: 'fr-FR', right: '🇫🇷', title: 'Français' },
        { value: 'it-IT', right: '🇮🇹', title: 'Italiano (beta)' },
        { value: 'ja-JP', right: '🇯🇵', title: '日本語' },
        { value: 'ko-KR', right: '🇰🇷', title: '한국어 (beta)' },
        { value: 'lt-LT', right: '🇱🇹', title: 'Lietuvių' },
        { value: 'nl-NL', right: '🇳🇱', title: 'Nederlands' },
        { value: 'pl-PL', right: '🇵🇱', title: 'Polski' },
        { value: 'pt-BR', right: '🇧🇷', title: 'Português Brasil (beta)' },
        { value: 'ro-RO', right: '🇷🇴', title: 'Română (beta)' },
        { value: 'sv-SE', right: '🇸🇪', title: 'Svenska' },
      ],
    },
  },
  themes: {
    name: 'Theme',
    description: 'Theme switcher',
    defaultValue: 'default',
    toolbar: {
      icon: 'photo',
      items: [
        { value: 'default', title: 'Default'},
        { value: 'midgar', title: 'Midgar'},
        { value: 'solarized_light', title: 'Solarized Light'},
        { value: 'solarized_dark', title: 'Solarized Dark'},
        ...(process.env.STORYBOOK_DEV ? [{ value: 'custom', title: 'Custom'}] : [])
      ],
    },
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        'Getting started',
        'Foundations',
        'Passbolt Components',
      ],
      method: (a, b) =>
        a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
    },
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color|border)$/i,
      date: /Date$/,
    },
  }
};

export const decorators = [withAppContextProvider, withLocalProvider, withStylesheet];
