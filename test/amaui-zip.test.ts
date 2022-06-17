/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import AmauiZip from '../src';

group('@amaui/zip', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);
  });

  to('AmauiZipResponse', async () => {
    const value = new AmauiZip.AmauiZipResponse(
      'a',
      14,
      4,
      1.14,
      14.4,
      true,
      1.04,
      '1 milliseconds'
    );

    const valueBrowsers = await evaluate((window: any) => {
      const value = new window.AmauiZip.AmauiZipResponse(
        'a',
        14,
        4,
        1.14,
        14.4,
        true,
        1.04,
        '1 milliseconds'
      );

      return value;
    }, { browsers });
    const valueNode = value;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql({
      value: 'a',
      original_byte_size: 14,
      value_byte_size: 4,
      compression_ratio: 1.14,
      compression_percentage: 14.4,
      positive: true,
      encode_execution_milliseconds: 1.04,
      encode_execution: '1 milliseconds',
    }));
  });

  group('AmauiZip', () => {

    group('AmauiZip', () => {

      to('AmauiZipResponse', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            new window.AmauiZip.AmauiZipResponse() instanceof window.AmauiZip.AmauiZipResponse,
          ];
        }, { browsers });
        const valueNode = [
          new AmauiZip.AmauiZipResponse() instanceof AmauiZip.AmauiZipResponse,
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
        ]));
      });

      to('decode', async () => {
        const uint8Array = AmauiZip.decode('1a 1 2 ,   E7AAAA==').value;

        const valueBrowsers = await evaluate((window: any) => {
          const uint8Array = window.AmauiZip.decode('1a 1 2 ,   E7AAAA==').value;
          const buffer = window.AmauiZip.decode('1a 1 1 ,   E7AAAA==').value;

          return [
            window.AmauiZip.decode('1 ,   AAIA').value,
            window.AmauiZip.decode('1;14 ,   AAIC').value,
            window.AmauiZip.decode('1;00 " 1 4  2 {a 1 :},   AAJwplM=').value,
            window.AmauiZip.decode('1;00 4, 2 1  1 [],   AAC4Ygc=').value,
            window.AmauiZip.decode('1;00 ru 1 e 1  t,   AADcBg==').value,
            window.AmauiZip.decode(undefined).value,
            window.AmauiZip.decode('1 ,   EgAA').value,
            window.AmauiZip.decode('1 ,   EwAAAA==').value,
            window.AmauiZip.decode('1 a,   EgAB').value,
            window.AmauiZip.decode('0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==').value,
            window.AmauiZip.decode('000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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').value,
            [uint8Array instanceof Uint8Array, [...uint8Array]],
            [buffer instanceof Uint8Array, [...buffer]],
          ];
        }, { browsers });
        const valueNode = [
          AmauiZip.decode('1 ,   AAIA').value,
          AmauiZip.decode('1;14 ,   AAIC').value,
          AmauiZip.decode('1;00 " 1 4  2 {a 1 :},   AAJwplM=').value,
          AmauiZip.decode('1;00 4, 2 1  1 [],   AAC4Ygc=').value,
          AmauiZip.decode('1;00 ru 1 e 1  t,   AADcBg==').value,
          AmauiZip.decode(undefined).value,
          AmauiZip.decode('1 ,   EgAA').value,
          AmauiZip.decode('1 ,   EwAAAA==').value,
          AmauiZip.decode('1 a,   EgAB').value,
          AmauiZip.decode('0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==').value,
          AmauiZip.decode('000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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').value,
          [uint8Array instanceof Uint8Array, [...uint8Array]],
          AmauiZip.decode('1a 1 1 ,   E7AAAA==').value,
        ];
        const values = [valueNode.slice(0, 12), ...valueBrowsers.map(item => item.slice(0, 12))];

        values.forEach(value => assert(value).eql([
          '',
          4,
          { a: 4 },
          [4, 1, 4],
          true,
          undefined,
          ' ',
          '  ',
          'a',
          'Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.',
          [true, [97, 97, 97]],
        ]));

        valueBrowsers.forEach(item => assert(item[12]).eql([true, [97, 97, 97]]));

        assert(Buffer.isBuffer(valueNode[12])).eq(true);
        assert([...valueNode[12]]).eql([97, 97, 97]);
      });

    });

    group('amauiLZ77Response', () => {

      to('amauiLZ77Response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            new window.AmauiZip('').response,
            new window.AmauiZip(4).response,
            new window.AmauiZip({ a: 4 }).response,
            new window.AmauiZip([4, 1, 4]).response,
            new window.AmauiZip(true).response,
            new window.AmauiZip(undefined).response,
            new window.AmauiZip(' ').response,
            new window.AmauiZip('  ').response,
            new window.AmauiZip('a').response,
            new window.AmauiZip('Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').response,
            new window.AmauiZip('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.').response,
            new window.AmauiZip(new Uint8Array([97, 97, 97])).response,
          ]
            .map(item => {
              if (item) {
                delete item.encode_execution;
                delete item.encode_execution_milliseconds;
              }

              return item;
            });
        }, { browsers });
        const valueNode = [
          new AmauiZip('').response,
          new AmauiZip(4).response,
          new AmauiZip({ a: 4 }).response,
          new AmauiZip([4, 1, 4]).response,
          new AmauiZip(true).response,
          new AmauiZip(undefined).response,
          new AmauiZip(' ').response,
          new AmauiZip('  ').response,
          new AmauiZip('a').response,
          new AmauiZip('Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').response,
          new AmauiZip('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.').response,
          new AmauiZip(new Uint8Array([97, 97, 97])).response,
          new AmauiZip(Buffer.from([97, 97, 97])).response,
        ]
          .map(item => {
            if (item) {
              delete item.encode_execution;
              delete item.encode_execution_milliseconds;
            }

            return item;
          });
        const values = [valueNode.slice(0, 12), ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          {
            value: '1 ,   AAIA',
            original_byte_size: 0,
            value_byte_size: 10,
            compression_ratio: 0,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '1;14 ,   AAIC',
            original_byte_size: 1,
            value_byte_size: 13,
            compression_ratio: 0.08,
            compression_percentage: -1200,
            positive: false
          },
          {
            value: '1;00 " 1 4  2 {a 1 :},   AAJwplM=',
            original_byte_size: 7,
            value_byte_size: 33,
            compression_ratio: 0.21,
            compression_percentage: -371.43,
            positive: false
          },
          {
            value: '1;00 4, 2 1  1 [],   AAC4Ygc=',
            original_byte_size: 7,
            value_byte_size: 29,
            compression_ratio: 0.24,
            compression_percentage: -314.29,
            positive: false
          },
          {
            value: '1;00 ru 1 e 1  t,   AADcBg==',
            original_byte_size: 4,
            value_byte_size: 28,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          undefined,
          {
            value: '1 ,   EgAA',
            original_byte_size: 1,
            value_byte_size: 10,
            compression_ratio: 0.1,
            compression_percentage: -900,
            positive: false
          },
          {
            value: '1 ,   EwAAAA==',
            original_byte_size: 2,
            value_byte_size: 14,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          {
            value: '1 a,   EgAB',
            original_byte_size: 1,
            value_byte_size: 11,
            compression_ratio: 0.09,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==',
            original_byte_size: 593,
            value_byte_size: 574,
            compression_ratio: 1.03,
            compression_percentage: 3.2,
            positive: true
          },
          {
            value: '000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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',
            original_byte_size: 2941,
            value_byte_size: 2381,
            compression_ratio: 1.24,
            compression_percentage: 19.04,
            positive: true
          },
          {
            value: '1a 1 2 ,   E7AAAA==',
            original_byte_size: 3,
            value_byte_size: 19,
            compression_ratio: 0.16,
            compression_percentage: -533.33,
            positive: false
          }
        ]));

        assert(valueNode[12]).eql({
          value: '1a 1 1 ,   E7AAAA==',
          original_byte_size: 3,
          value_byte_size: 19,
          compression_ratio: 0.16,
          compression_percentage: -533.33,
          positive: false
        });
      });

      to('encoded', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            new window.AmauiZip('').encoded,
            new window.AmauiZip(4).encoded,
            new window.AmauiZip({ a: 4 }).encoded,
            new window.AmauiZip([4, 1, 4]).encoded,
            new window.AmauiZip(true).encoded,
            new window.AmauiZip(undefined).encoded,
            new window.AmauiZip(' ').encoded,
            new window.AmauiZip('  ').encoded,
            new window.AmauiZip('a').encoded,
            new window.AmauiZip('Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').encoded,
            new window.AmauiZip('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.').encoded,
            new window.AmauiZip(new Uint8Array([97, 97, 97])).encoded,
          ]
            .map(item => {
              if (item) {
                delete item.encode_execution;
                delete item.encode_execution_milliseconds;
              }

              return item;
            });
        }, { browsers });
        const valueNode = [
          new AmauiZip('').encoded,
          new AmauiZip(4).encoded,
          new AmauiZip({ a: 4 }).encoded,
          new AmauiZip([4, 1, 4]).encoded,
          new AmauiZip(true).encoded,
          new AmauiZip(undefined).encoded,
          new AmauiZip(' ').encoded,
          new AmauiZip('  ').encoded,
          new AmauiZip('a').encoded,
          new AmauiZip('Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.').encoded,
          new AmauiZip('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.').encoded,
          new AmauiZip(new Uint8Array([97, 97, 97])).encoded,
          new AmauiZip(Buffer.from([97, 97, 97])).encoded,
        ]
          .map(item => {
            if (item) {
              delete item.encode_execution;
              delete item.encode_execution_milliseconds;
            }

            return item;
          });
        const values = [valueNode.slice(0, 12), ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          {
            value: '1 ,   AAIA',
            original_byte_size: 0,
            value_byte_size: 10,
            compression_ratio: 0,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '1;14 ,   AAIC',
            original_byte_size: 1,
            value_byte_size: 13,
            compression_ratio: 0.08,
            compression_percentage: -1200,
            positive: false
          },
          {
            value: '1;00 " 1 4  2 {a 1 :},   AAJwplM=',
            original_byte_size: 7,
            value_byte_size: 33,
            compression_ratio: 0.21,
            compression_percentage: -371.43,
            positive: false
          },
          {
            value: '1;00 4, 2 1  1 [],   AAC4Ygc=',
            original_byte_size: 7,
            value_byte_size: 29,
            compression_ratio: 0.24,
            compression_percentage: -314.29,
            positive: false
          },
          {
            value: '1;00 ru 1 e 1  t,   AADcBg==',
            original_byte_size: 4,
            value_byte_size: 28,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          undefined,
          {
            value: '1 ,   EgAA',
            original_byte_size: 1,
            value_byte_size: 10,
            compression_ratio: 0.1,
            compression_percentage: -900,
            positive: false
          },
          {
            value: '1 ,   EwAAAA==',
            original_byte_size: 2,
            value_byte_size: 14,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          {
            value: '1 a,   EgAB',
            original_byte_size: 1,
            value_byte_size: 11,
            compression_ratio: 0.09,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==',
            original_byte_size: 593,
            value_byte_size: 574,
            compression_ratio: 1.03,
            compression_percentage: 3.2,
            positive: true
          },
          {
            value: '000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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',
            original_byte_size: 2941,
            value_byte_size: 2381,
            compression_ratio: 1.24,
            compression_percentage: 19.04,
            positive: true
          },
          {
            value: '1a 1 2 ,   E7AAAA==',
            original_byte_size: 3,
            value_byte_size: 19,
            compression_ratio: 0.16,
            compression_percentage: -533.33,
            positive: false
          }
        ]));

        assert(valueNode[12]).eql({
          value: '1a 1 1 ,   E7AAAA==',
          original_byte_size: 3,
          value_byte_size: 19,
          compression_ratio: 0.16,
          compression_percentage: -533.33,
          positive: false
        });
      });

      to('encode', async () => {
        let amauiZips = [];

        for (let i = 0; i < 13; i++) amauiZips[i] = new AmauiZip();

        amauiZips[0].value = '';
        amauiZips[1].value = 4;
        amauiZips[2].value = { a: 4 };
        amauiZips[3].value = [4, 1, 4];
        amauiZips[4].value = true;
        amauiZips[5].value = undefined;
        amauiZips[6].value = ' ';
        amauiZips[7].value = '  ';
        amauiZips[8].value = 'a';
        amauiZips[9].value = 'Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.';
        amauiZips[10].value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.';
        amauiZips[11].value = new Uint8Array([97, 97, 97]);
        amauiZips[12].value = Buffer.from([97, 97, 97]);

        amauiZips = amauiZips
          .map((item) => {
            if (!['uint8array', 'buffer', 'string'].some(item_ => AmauiUtils.is(item_, item.value))) {
              item.value = AmauiUtils.serialize(item.value);

              item.serialized = true;
            }

            item.encode();

            return item.response;
          })
          .map(item => {
            if (item) {
              delete item.encode_execution;
              delete item.encode_execution_milliseconds;
            }

            return item;
          });

        const valueBrowsers = await evaluate((window: any) => {
          let amauiZips = [];

          for (let i = 0; i < 12; i++) amauiZips[i] = new window.AmauiZip();

          amauiZips[0].value = '';
          amauiZips[1].value = 4;
          amauiZips[2].value = { a: 4 };
          amauiZips[3].value = [4, 1, 4];
          amauiZips[4].value = true;
          amauiZips[5].value = undefined;
          amauiZips[6].value = ' ';
          amauiZips[7].value = '  ';
          amauiZips[8].value = 'a';
          amauiZips[9].value = 'Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.';
          amauiZips[10].value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.';
          amauiZips[11].value = new Uint8Array([97, 97, 97]);

          amauiZips = amauiZips
            .map((item) => {
              if (!['uint8array', 'buffer', 'string'].some(item_ => window.AmauiUtils.is(item_, item.value))) {
                item.value = window.AmauiUtils.serialize(item.value);

                item.serialized = true;
              }

              item.encode();

              return item.response;
            })
            .map(item => {
              if (item) {
                delete item.encode_execution;
                delete item.encode_execution_milliseconds;
              }

              return item;
            });

          return amauiZips;
        }, { browsers });

        const valueNode = amauiZips;

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          {
            value: '1 ,   AAIA',
            original_byte_size: 0,
            value_byte_size: 10,
            compression_ratio: 0,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '1;14 ,   AAIC',
            original_byte_size: 1,
            value_byte_size: 13,
            compression_ratio: 0.08,
            compression_percentage: -1200,
            positive: false
          },
          {
            value: '1;00 " 1 4  2 {a 1 :},   AAJwplM=',
            original_byte_size: 7,
            value_byte_size: 33,
            compression_ratio: 0.21,
            compression_percentage: -371.43,
            positive: false
          },
          {
            value: '1;00 4, 2 1  1 [],   AAC4Ygc=',
            original_byte_size: 7,
            value_byte_size: 29,
            compression_ratio: 0.24,
            compression_percentage: -314.29,
            positive: false
          },
          {
            value: '1;00 ru 1 e 1  t,   AADcBg==',
            original_byte_size: 4,
            value_byte_size: 28,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          {
            value: '1;1 ,   AAIA',
            original_byte_size: 0,
            value_byte_size: 12,
            compression_ratio: 0,
            compression_percentage: -1200,
            positive: false
          },
          {
            value: '1 ,   EgAA',
            original_byte_size: 1,
            value_byte_size: 10,
            compression_ratio: 0.1,
            compression_percentage: -900,
            positive: false
          },
          {
            value: '1 ,   EwAAAA==',
            original_byte_size: 2,
            value_byte_size: 14,
            compression_ratio: 0.14,
            compression_percentage: -600,
            positive: false
          },
          {
            value: '1 a,   EgAB',
            original_byte_size: 1,
            value_byte_size: 11,
            compression_ratio: 0.09,
            compression_percentage: -1000,
            positive: false
          },
          {
            value: '0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==',
            original_byte_size: 593,
            value_byte_size: 574,
            compression_ratio: 1.03,
            compression_percentage: 3.2,
            positive: true
          },
          {
            value: '000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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',
            original_byte_size: 2941,
            value_byte_size: 2381,
            compression_ratio: 1.24,
            compression_percentage: 19.04,
            positive: true
          },
          {
            value: '1a 1 2 ,   E7AAAA==',
            original_byte_size: 3,
            value_byte_size: 19,
            compression_ratio: 0.16,
            compression_percentage: -533.33,
            positive: false
          }
        ]));

        assert(valueNode).eql([
          {
            "value": "1 ,   AAIA",
            "original_byte_size": 0,
            "value_byte_size": 10,
            "compression_ratio": 0,
            "compression_percentage": -1000,
            "positive": false
          },
          {
            "value": "1;14 ,   AAIC",
            "original_byte_size": 1,
            "value_byte_size": 13,
            "compression_ratio": 0.08,
            "compression_percentage": -1200,
            "positive": false
          },
          {
            "value": "1;00 \" 1 4  2 {a 1 :},   AAJwplM=",
            "original_byte_size": 7,
            "value_byte_size": 33,
            "compression_ratio": 0.21,
            "compression_percentage": -371.43,
            "positive": false
          },
          {
            "value": "1;00 4, 2 1  1 [],   AAC4Ygc=",
            "original_byte_size": 7,
            "value_byte_size": 29,
            "compression_ratio": 0.24,
            "compression_percentage": -314.29,
            "positive": false
          },
          {
            "value": "1;00 ru 1 e 1  t,   AADcBg==",
            "original_byte_size": 4,
            "value_byte_size": 28,
            "compression_ratio": 0.14,
            "compression_percentage": -600,
            "positive": false
          },
          {
            "value": "1;00 de 2 \"n 2  u 1 fi,   AADJtHvqBA==",
            "original_byte_size": 11,
            "value_byte_size": 38,
            "compression_ratio": 0.29,
            "compression_percentage": -245.45,
            "positive": false
          },
          {
            "value": "1 ,   EgAA",
            "original_byte_size": 1,
            "value_byte_size": 10,
            "compression_ratio": 0.1,
            "compression_percentage": -900,
            "positive": false
          },
          {
            "value": "1 ,   EwAAAA==",
            "original_byte_size": 2,
            "value_byte_size": 14,
            "compression_ratio": 0.14,
            "compression_percentage": -600,
            "positive": false
          },
          {
            "value": "1 a,   EgAB",
            "original_byte_size": 1,
            "value_byte_size": 11,
            "compression_ratio": 0.09,
            "compression_percentage": -1000,
            "positive": false
          },
          {
            "value": "0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==",
            "original_byte_size": 593,
            "value_byte_size": 574,
            "compression_ratio": 1.03,
            "compression_percentage": 3.2,
            "positive": true
          },
          {
            "value": "000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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",
            "original_byte_size": 2941,
            "value_byte_size": 2381,
            "compression_ratio": 1.24,
            "compression_percentage": 19.04,
            "positive": true
          },
          {
            "value": "1a 1 2 ,   E7AAAA==",
            "original_byte_size": 3,
            "value_byte_size": 19,
            "compression_ratio": 0.16,
            "compression_percentage": -533.33,
            "positive": false
          },
          {
            "value": "1a 1 1 ,   E7AAAA==",
            "original_byte_size": 3,
            "value_byte_size": 19,
            "compression_ratio": 0.16,
            "compression_percentage": -533.33,
            "positive": false
          }
        ]);
      });

      to('decode', async () => {
        const uint8Array = AmauiZip.decode('1a 1 2 ,   E7AAAA==').value;

        const valueBrowsers = await evaluate((window: any) => {
          const uint8Array = new window.AmauiZip().decode('1a 1 2 ,   E7AAAA==').value;
          const buffer = new window.AmauiZip().decode('1a 1 1 ,   E7AAAA==').value;

          const values_ = [
            new window.AmauiZip().decode('1 ,   AAIA').value,
            new window.AmauiZip().decode('1;14 ,   AAIC').value,
            new window.AmauiZip().decode('1;00 " 1 4  2 {a 1 :},   AAJwplM=').value,
            new window.AmauiZip().decode('1;00 4, 2 1  1 [],   AAC4Ygc=').value,
            new window.AmauiZip().decode('1;00 ru 1 e 1  t,   AADcBg==').value,
            new window.AmauiZip().decode(undefined).value,
            new window.AmauiZip().decode('1 ,   EgAA').value,
            new window.AmauiZip().decode('1 ,   EwAAAA==').value,
            new window.AmauiZip().decode('1 a,   EgAB').value,
            new window.AmauiZip().decode('0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==').value,
            new window.AmauiZip().decode('000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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').value,
            [uint8Array instanceof Uint8Array, [...uint8Array]],
            [buffer instanceof Uint8Array, [...buffer]],
          ];

          return values_;
        }, { browsers });
        const values_ = [
          new AmauiZip().decode('1 ,   AAIA').value,
          new AmauiZip().decode('1;14 ,   AAIC').value,
          new AmauiZip().decode('1;00 " 1 4  2 {a 1 :},   AAJwplM=').value,
          new AmauiZip().decode('1;00 4, 2 1  1 [],   AAC4Ygc=').value,
          new AmauiZip().decode('1;00 ru 1 e 1  t,   AADcBg==').value,
          new AmauiZip().decode(undefined).value,
          new AmauiZip().decode('1 ,   EgAA').value,
          new AmauiZip().decode('1 ,   EwAAAA==').value,
          new AmauiZip().decode('1 a,   EgAB').value,
          new AmauiZip().decode('0000 si 2 l 1 p 1 bq 1 o 1 ` 2 8j 1 1h 1   1 t 1 m 1 . 1 g 2 LF 1 SP 2 e 1 rn 2 u 1 d, 1 a 1 c 2 f 1 IC 2 vD 2 24 1 69,   AAJPw1RyxCUABjloxDUgFlzo2141hPNGyl2hKEPDb5Qgs8n7gehx8+2eHR2187wkEBBBNKVzHfz+78cUf9UauRYnXoWXY+yPJ/TSHSKJ3pXMvkIACG07iQADO1yrGrHKxAAI8vq1hGofQEE0ndlCAAvg2JbATjj492eHPL7JwAALimlsm7wsKAAN4TAXxdpEFjVyY1F8lsipS8a8LDyswNXbRUpDfoUxgR+LpfQwPL6to+lL2UGBtG0ACZDpVjVjkWJ16Ftq4XyL8hBZcQAEvnORtCba5lR+a/YAAoQWUBlc8pXM8n/RhtR9AAG4AA7/fNnh0ILbO/57ssc4xIDDFYgACgAI4qUuZ5fdcCG2laxydwAAcrnk44+mzwAOrGrHPL9wQXjOcbRl+S5fMII9wGNtd5FGpuTQhMBFQhJbQC+RAATTy/TXPKMrEBXY7AAHAg==').value,
          new AmauiZip().decode('000   1 is 2 a, 1 t 1 m 1 1 2 kx 1 h 1 3N 4 u 1 o 1 p8 1 e 1 c 1 v 4 PI 1 SM 2 DA 1 w 1 VE 4 ln 1 r 1 . 1 qb 1 ` 4 9 2 45 1 j\n 1 g 1 f 1 02 1 d 1 7 1 6 2 CQ 1 y 1 F 1 z 1 LU,   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').value,
          [uint8Array instanceof Uint8Array, [...uint8Array]],
          new AmauiZip().decode('1a 1 1 ,   E7AAAA==').value,
        ];

        const valueNode = values_;
        const values = [valueNode.slice(0, 12), ...valueBrowsers.map(item => item.slice(0, 12))];

        values.forEach(value => assert(value).eql([
          '',
          4,
          { a: 4 },
          [4, 1, 4],
          true,
          undefined,
          ' ',
          '  ',
          'a',
          'Lorem u ipsum dolor sit amet, consectetur adipiscing elit. Fuscem dolor em, facilisis sed eratr sit amet, pharetra blandit augue. Sed id placerat felis, malesuada rutrum nisl. In ultrices sed mauris finibus mmalesuad. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer cursus, odio id rutrum blandit, neque velit aliquam odio, at rhoncus elit est nec erat. Proin egestassed maurelit, eratr sit molestie nisi semper at. Cras interdum massa nec mmolestierutrum. Duis commodo venenatis justo, ac porta tellus pellentesque sed. Donec et nisi aumus.',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.\n\nMauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.\n\nMaecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.\n\nQuisque vulputate in velit vel volutpat. Fusce sollicitudin sed risus et volutpat. Aliquam eget nisi vel risus tempor iaculis. In lobortis consectetur ipsum, sed consectetur mi eleifend a. Maecenas egestas erat quis gravida tristique. In hac habitasse platea dictumst. Cras sollicitudin non augue volutpat ultricies. Mauris finibus urna velit, a egestas tellus finibus ut. Nam a tortor et ligula vestibulum consectetur sit amet ac mi. Nulla consectetur diam vitae elit tristique fringilla. Duis eget magna mauris.\n\nInteger ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.',
          [true, [97, 97, 97]],
        ]));

        valueBrowsers.forEach(item => assert(item[12]).eql([true, [97, 97, 97]]));

        assert(Buffer.isBuffer(valueNode[12])).eq(true);
        assert([...valueNode[12]]).eql([97, 97, 97]);
      });

    });

  });

});
