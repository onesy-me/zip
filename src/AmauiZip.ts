import is from '@onesy/utils/is';
import to from '@onesy/utils/to';
import parse from '@onesy/utils/parse';
import serialize from '@onesy/utils/serialize';
import OnesyDate from '@onesy/date/OnesyDate';
import duration from '@onesy/date/duration';
import OnesyHuffmanCode from '@onesy/huffman-code';
import OnesyLZ77 from '@onesy/lz77';
import merge from '@onesy/utils/merge';

class OnesyZipResponse {

  public constructor(
    public value?: any,
    public original_byte_size?: number,
    public value_byte_size?: number,
    public compression_ratio?: number,
    public compression_percentage?: number,
    public positive?: boolean,
    public performance_milliseconds?: number,
    public performance?: string
  ) { }

}

export interface IOptions {
  encode_values?: boolean;
  huffman_code?: 'auto' | boolean;
}

const optionsDefault: IOptions = {
  encode_values: true,
  huffman_code: 'auto'
};

class OnesyZip {
  public options: IOptions = {};
  public serialized = false;
  public response: OnesyZipResponse;

  public static get OnesyZipResponse() { return OnesyZipResponse; }

  public static decode(value: string) {
    return new OnesyZip().decode(value);
  }

  public get encoded(): OnesyZipResponse {
    return this.response;
  }

  public constructor(
    public value?: any,
    options: IOptions = optionsDefault
  ) {
    this.options = merge(options, optionsDefault);

    if (value !== undefined) this.init();
  }

  private init(): void {
    if (!['uint8array', 'buffer', 'string'].some((item: any) => is(item, this.value))) {
      this.value = serialize(this.value);

      this.serialized = true;
    }

    // Encode
    this.encode();
  }

  public encode(): OnesyZipResponse {
    const startTime = OnesyDate.milliseconds;

    const lz77 = new OnesyLZ77(this.value);

    let value = lz77.response.value;

    const options = [this.serialized ? 1 : 0];

    if (['auto', true].includes(this.options.huffman_code)) {
      const huffmanCode = new OnesyHuffmanCode(lz77.response.value, { encode_values: this.options?.encode_values });

      if (
        huffmanCode.response.positive ||
        this.options.huffman_code === true
      ) {
        value = `${huffmanCode.response.values_encoded},   ${huffmanCode.response.value}`;

        options.unshift(1);
      }
      else options.unshift(0);
    }
    else options.unshift(0);

    value = `${options.join('')}${value}`;

    const response: OnesyZipResponse = new OnesyZipResponse(value);

    response.performance_milliseconds = OnesyDate.milliseconds - startTime;
    response.performance = duration(response.performance_milliseconds) || '0 milliseconds';
    response.original_byte_size = to(this.value, 'byte-size') as number;
    response.value_byte_size = to(response.value, 'byte-size') as number;
    response.compression_ratio = Number((((response.value_byte_size + response.original_byte_size) / response.value_byte_size) - 1).toFixed(2));
    response.compression_percentage = response.original_byte_size === 0 ? response.value_byte_size === 0 ? 0 : response.value_byte_size * -100 : Number((((response.original_byte_size - response.value_byte_size) / response.original_byte_size) * 100).toFixed(2));
    response.positive = response.compression_ratio > 1;

    this.response = response;

    return response;
  }

  public decode(value_: string): OnesyZipResponse {
    const response = new OnesyZipResponse();

    const startTime = OnesyDate.milliseconds;

    if (is('string', value_)) {
      const huffmanCode = value_[0] === '1';
      const serialized = value_[1] === '1';

      let value = value_.slice(2);

      const separator = value.indexOf(',   ');

      // Huffman code
      if (huffmanCode) {
        let huffmanValues: any = value.substring(0, separator);
        const huffmanValue = value.substring(separator + 4);

        if (huffmanValue && huffmanValues) {
          huffmanValues = OnesyHuffmanCode.decodeValues(huffmanValues);

          const huffman = OnesyHuffmanCode.decode(huffmanValue, huffmanValues);

          value = huffman.value;
        }
      }

      // lz77
      const lz77 = OnesyLZ77.decode(value);

      response.value = lz77.value;

      if (serialized) response.value = parse(response.value);

      response.performance_milliseconds = OnesyDate.milliseconds - startTime;
      response.performance = duration(response.performance_milliseconds) || '0 milliseconds';
      response.original_byte_size = to(response.value, 'byte-size') as number;
      response.value_byte_size = to(value_, 'byte-size') as number;
    }

    return response;
  }

}

export default OnesyZip;
