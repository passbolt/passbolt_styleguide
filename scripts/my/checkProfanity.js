#!/usr/bin/node

// Check with microsoft moderator
import fetch from 'node-fetch';

async function doIt(lg, index, txt) {
  const microsoftUrl = new URL('https://passbolt-moderator-lab.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen');
  const params = new URLSearchParams(microsoftUrl.search);
  params.append('autocorrect', true);
  params.append('PII', true);
  params.append('autocorrect', true);
  params.append('classify', true);
  params.append('language', lg);
  microsoftUrl.search = params;

  const fetchOptions = {
    headers: {
      'Ocp-Apim-Subscription-Key': '8d7bca9e10c6457e99936b937fe87029',
      'Content-Type': 'text/plain'
    },
    method: 'POST',
    body: txt
  };
  const response = await fetch(microsoftUrl.toString(), fetchOptions);

  let responseJson;
  try {
    responseJson = await response.json();
  } catch (error) {
    // cananot parse
    console.error('Cannot parse');
    console.error('error');
    return;
  }

  if (!response.ok) {
    console.error(`Cannot parse result of batch index (${index})`);
    console.log(responseJson);
    return;
  }

  if (!responseJson?.Terms?.length) {
    console.log('NO profanity found in lg(' + lg + ') batch (' + index + ')');
    return;
  }

  console.log('profanity found in lg(' + lg + ') batch (' + index + ')');
  console.log(responseJson?.Terms);

  // console.log(response);
}

// await doIt();

  // $.ajax({
  //   url: "https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?" + $.param(params),
  //   beforeSend: function(xhrObj){
  //     // Request headers
  //     xhrObj.setRequestHeader("Content-Type","text/plain");
  //     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
  //   },
  //   type: "POST",
  //   // Request body
  //   data: "{body}",
  // })
  //   .done(function(data) {
  //     alert("success");
  //   })
  //   .fail(function() {
  //     alert("error");
  //   });


// // Check with openAI
//
// import { Configuration, OpenAIApi } from "openai";
import {readFileSync} from "fs";
//
// const configuration = new Configuration({
//   // organization: "org-3uRiLHar6D3ZcYoToVE53Ugw",
//   apiKey: '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',
// });
// const openai = new OpenAIApi(configuration);
//

const languages = {
  // 'de-DE': 'deu',
  // 'en-UK': 'eng',
  // 'es-ES': 'spa',
  // 'fr-FR': 'fra',
  'it-IT': 'ita',
  // 'ja-JP': 'jpn',
  'ko-KR': 'kor',
  // 'lt-LT': 'lit',
  // 'nl-NL': 'nld',
  // 'pl-PL': 'pol',
  'pt-PT': 'por',
  'ro-RO': 'ron',
  // 'sv-SE': 'swe',
};

for (const lgPath in languages) {
  const batch = [];
  try {
    const data = readFileSync('./src/locales/' + lgPath + '/common.json', 'utf8');
    const obj = JSON.parse(data);
    const strings = Object.values(obj);

    let current = 0;
    for(let i=0; i<strings.length; i++) {
      if (batch[current]?.length + strings[i].length > 1000) {
        current++;
      }
      if (!batch[current]) {
        batch[current] = "";
      }
      batch[current] = batch[current] + ' | ' + strings[i];
      //
      // batch[batchI] = batch[batchI] ? batch[batchI] : [];
      // batch[batchI].push(strings[i]);
    }
  } catch (err) {
    console.error(err);
  }
// console.log(batch[0]);
  console.log(Object.keys(batch));
  console.log('Check for ' + lgPath);
  for(const b in batch) {
    // console.log(batch[b]);
    // break;
    await doIt(languages[lgPath], b, batch[b]);
    await new Promise(resolve => setTimeout(resolve, 1100));
  }
}

//
// let i = 0;
// async function crawl() {
//   const txt = batch[i].join(' ') + ' Cabrão';
//   console.log(txt);
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: `Search the given text for profanities and list the profanities you found. ${txt}`,
//     temperature: 0,
//     max_tokens: 7,
//     echo: false,
//     // stream: true,
//     // top_p: 1.0,
//     // frequency_penalty: 0.0,
//     // presence`_penalty: 0.0,
//   });
//   console.log(`batch ${i}`);
//   console.log(response.data.choices[0].text);
//   await new Promise(resolve => setTimeout(resolve, 500));
//   i++;
//   crawl();
// }
//
// await crawl();
//
// // const response = await openai.createCompletion({
// //   model: "text-davinci-003",
// //   prompt: `Search the given text for profanities and make a list. ${txt}`,
// //   temperature: 0,
// //   max_tokens: 500,
// //   echo: false,
// //   // stream: true,
// //   // top_p: 1.0,
// //   // frequency_penalty: 0.0,
// //   // presence`_penalty: 0.0,
// // });
// // console.log(response.data);
// // console.log(response.data.reduce((agg, value) => agg += value, ""));
