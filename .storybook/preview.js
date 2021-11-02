import React from 'react';
import MockTranslationProvider from "../src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import { addDecorator } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes/react';

const withLocalProvider = (Story, context) =>
  <MockTranslationProvider language={context.globals.locale}>
    <Story {...context} />
  </MockTranslationProvider>;

function ThemeDecorator(props) {
  const { children, themeName } = props;
  return (
    <>
      {children}
      {themeName && themeName !== '' && themeName !== 'default' && <>
        <link rel="stylesheet" href={`/css/themes/${themeName}/api_main.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/api_reports.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/ext_app.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/ext_authentication.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/ext_in_form_cta.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/ext_in_form_menu.css`}/>
        <link rel="stylesheet" href={`/css/themes/${themeName}/ext_quickaccess.css`}/>
      </>}
    </>
  );
};

addDecorator(withLocalProvider);
addDecorator(withThemes);

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
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'default',
    list: [
      { name: 'default', class: '', color: '#fff' },
      { name: 'midgar', class: 'midgar', color: '#30302d' }
    ],
    Decorator: ThemeDecorator
  }
};
