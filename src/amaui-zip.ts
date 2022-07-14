import is from '@amaui/utils/is';
import to from '@amaui/utils/to';
import parse from '@amaui/utils/parse';
import serialize from '@amaui/utils/serialize';
import AmauiDate from '@amaui/date/amaui-date';
import duration from '@amaui/date/duration';
import AmauiHuffmanCode from '@amaui/huffman-code';
import AmauiLZ77 from '@amaui/lz77';

class AmauiZipResponse {

  public constructor(
    public value?: any,
    public original_byte_size?: number,
    public value_byte_size?: number,
    public compression_ratio?: number,
    public compression_percentage?: number,
    public positive?: boolean,
    public encode_execution_milliseconds?: number,
    public encode_execution?: string
  ) { }

}

class AmauiZip {
  public serialized = false;
  public response: AmauiZipResponse;

  public static get AmauiZipResponse() { return AmauiZipResponse; }

  public static decode(value: string) {
    return new AmauiZip().decode(value);
  }

  public get encoded(): AmauiZipResponse {
    return this.response;
  }

  public constructor(
    public value?: any
  ) {
    if (value !== undefined) this.init();
  }

  private init(): void {
    if (!['uint8array', 'buffer', 'string'].some(item => is(item, this.value))) {
      this.value = serialize(this.value);

      this.serialized = true;
    }

    // Encode
    this.encode();
  }

  public encode(): AmauiZipResponse {
    const startTime = AmauiDate.milliseconds;

    const lz77 = new AmauiLZ77(this.value);

    const huffmanCode = new AmauiHuffmanCode(lz77.response.value);

    let value = `${huffmanCode.response.values_encoded},   ${huffmanCode.response.value}`;

    if (this.serialized) value = `1;${value}`;

    const response: AmauiZipResponse = new AmauiZipResponse(value);

    response.encode_execution_milliseconds = AmauiDate.milliseconds - startTime;
    response.encode_execution = duration(response.encode_execution_milliseconds) || '0 milliseconds';
    response.original_byte_size = to(this.value, 'byte-size') as number;
    response.value_byte_size = to(response.value, 'byte-size') as number;
    response.compression_ratio = Number((((response.value_byte_size + response.original_byte_size) / response.value_byte_size) - 1).toFixed(2));
    response.compression_percentage = response.original_byte_size === 0 ? response.value_byte_size === 0 ? 0 : response.value_byte_size * -100 : Number((((response.original_byte_size - response.value_byte_size) / response.original_byte_size) * 100).toFixed(2));
    response.positive = response.compression_ratio > 1;

    this.response = response;

    return response;
  }

  public decode(value_: string): AmauiZipResponse {
    const response = new AmauiZipResponse();

    const startTime = AmauiDate.milliseconds;

    if (is('string', value_)) {
      let meta = '';
      let value: any = value_;

      if (['1'].some(item => value_[0] === item) && value_[1] === ';') {
        meta = value_.slice(0, 2);

        value = value_.slice(2);
      }

      const serialized = meta[0] === '1';

      const separator = value.indexOf(',   ');

      let huffmanValues = value.substring(0, separator);
      const huffmanValue = value.substring(separator + 4);

      if (huffmanValue && huffmanValues) {
        huffmanValues = AmauiHuffmanCode.decodeValues(huffmanValues);

        const huffman = AmauiHuffmanCode.decode(huffmanValue, huffmanValues);

        const lz77 = AmauiLZ77.decode(huffman.value);

        response.value = lz77.value;

        if (serialized) response.value = parse(response.value);

        response.encode_execution_milliseconds = AmauiDate.milliseconds - startTime;
        response.encode_execution = duration(response.encode_execution_milliseconds) || '0 milliseconds';
        response.original_byte_size = to(value_, 'byte-size') as number;
        response.value_byte_size = to(response.value, 'byte-size') as number;
      }
    }

    return response;
  }

}

export default AmauiZip;
