import React from 'react';
import MockTranslationProvider from "../src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

const withLocalProvider = (Story, context) =>
  <MockTranslationProvider language={context.globals.locale}>
    <Story/>
  </MockTranslationProvider>;

function withStylesheet(Story, context) {
  const themeName = context.globals.themes || "default";
  const css = context.parameters.css || "ext_app";

  return (
    <>
      <link rel="stylesheet" href={`/css/themes/${themeName}/${css}.css`}/>
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
        { value: 'en-UK', right: '🇬🇧', title: 'English' },
        { value: 'fr-FR', right: '🇫🇷', title: 'Français' }
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
        { value: 'midgar', title: 'Midgar'}
      ],
    },
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
};

export const decorators = [withLocalProvider, withStylesheet];
