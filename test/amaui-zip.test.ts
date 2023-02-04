/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import AmauiZip from '../src';

group('@amaui/zip', () => {

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
    });
    const valueNode = value;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql({
      value: 'a',
      original_byte_size: 14,
      value_byte_size: 4,
      compression_ratio: 1.14,
      compression_percentage: 14.4,
      positive: true,
      performance_milliseconds: 1.04,
      performance: '1 milliseconds',
    }));
  });

  group('AmauiZip', () => {

    group('AmauiZip', () => {

      to('encode, decode', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const values = [
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
            new Uint8Array([97, 97, 97])
          ];

          const result = values.map(item => window.AmauiZip.decode(new window.AmauiZip(item).response?.value).value);

          result[result.length - 1] = [result[result.length - 1] instanceof Uint8Array, Array.from(result[result.length - 1])];

          return result;
        });

        const values_ = [
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
          new Uint8Array([97, 97, 97])
        ];

        const result = values_.map(item => AmauiZip.decode(new AmauiZip(item).response?.value).value);

        result[result.length - 1] = [result[result.length - 1] instanceof Uint8Array, Array.from(result[result.length - 1])];

        const valueNode = result;

        const values = [valueNode, ...valueBrowsers];

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
          [true, [97, 97, 97]]
        ]));
      });

    });

  });

  group('Use cases', () => {

    to(`Text that ends up having padded 0's in binary form, and was incorrectly decoded, missing a character`, async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiZip.decode(new window.AmauiZip(`asdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdad`).response.value).value
        ];

        return values_;
      });
      const values_ = [
        AmauiZip.decode(new AmauiZip(`asdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdad`).response.value).value
      ];

      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        `asdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdad`
      ]));
    });

    to('Japanese characters, UTF-16', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiZip.decode(new window.AmauiZip({ "id": "a", "name": "アマウイ大好き" }).response.value).value
        ];

        return values_;
      });
      const values_ = [
        AmauiZip.decode(new AmauiZip({ "id": "a", "name": "アマウイ大好き" }).response.value).value
      ];

      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        { id: 'a', name: 'アマウイ大好き' }
      ]));
    });

  });

});
