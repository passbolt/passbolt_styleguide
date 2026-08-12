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
      <link rel="stylesheet" href={`css/themes/${themeName}/${css}.min.css`}/>
      <Story/>
    </>
  );
};

const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        //TODO: this might be improve to dynamically generate the language list
        { value: 'de-DE', right: '🇩🇪', title: 'Deutsch' },
        { value: 'en-GB', right: '🇬🇧', title: 'English' },
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
        { value: 'ru-RU', right: '🇷🇺', title: 'Pусский (beta)' },
        { value: 'sl-SI', right: '🇸🇮', title: 'Slovenščina' },
        { value: 'sv-SE', right: '🇸🇪', title: 'Svenska' },
        { value: 'uk-UA', right: '🇺🇦', title: 'Українська (beta)' },
        { value: 'cs-CZ', right: '🇨🇿', title: 'Čeština (beta)' },
      ],
    },
  },
  themes: {
    name: 'Theme',
    description: 'Theme switcher',
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

const initialGlobals = {
  locale: 'en-GB',
  themes: 'default',
};

const parameters = {
  options: {
    storySort: {
      order: [
        'Getting started',
        'Foundations',
        'Passbolt Components',
      ],
      method: "alphabetical"
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

const decorators = [withAppContextProvider, withLocalProvider, withStylesheet];

export default {decorators, parameters, globalTypes, initialGlobals};
