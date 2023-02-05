
</br >
</br >

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img src='utils/images/logo.svg' alt='amaui logo' />
  </a>
</p>

<h1 align='center'>amaui Zip</h1>

<p align='center'>
  Zip / Unzip
</p>

<br />

<h3 align='center'>
  <sub>MIT license&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Production ready&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>UMD 14.6kb gzipped&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>100% test cov&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Browser and Nodejs</sub>
</h3>

<p align='center'>
  <sub>Very simple code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Modern code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Junior friendly&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Typescript&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Made with :yellow_heart:</sub>
</p>

<br />

## Getting started

### Add

```sh
  // yarn
  yarn add @amaui/zip

  // npm
  npm install @amaui/zip
```

### Use

More redundant and bigger in size input is, better compression will be.

For small and low redundant input, you will probably get negative compression (zipped value is larger in size, than the original input), which you can check in `response.positive` value. <br ><br >

```javascript
  import AmauiZip from '@amaui/zip';

  // Make a new zip instance
  // with value to be zipped
  const amauiZip = new AmauiZip(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt justo sit amet mi ornare volutpat. Praesent consequat mauris id massa vehicula, ac molestie dolor tincidunt. Fusce neque dolor, commodo nec justo nec, commodo euismod erat. Vivamus at tincidunt massa, nec tempor ante. In suscipit nisl nec faucibus gravida. In non commodo erat, eu luctus ligula. Sed purus justo, congue in congue eget, placerat scelerisque velit. Sed vel arcu risus. Vivamus auctor quis erat a porta.

Mauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.

Maecenas molestie neque vel purus aliquam, vitae pharetra purus molestie. Fusce sit amet odio condimentum, bibendum velit scelerisque, placerat lorem. Aenean vestibulum lacus sit amet lectus sagittis consequat. Suspendisse est ante, dignissim eget lectus ac, dapibus ornare purus. Proin porta pharetra ipsum, eu eleifend erat consectetur pretium. Nullam sodales nisi non metus volutpat, luctus blandit tellus iaculis. Quisque eleifend erat orci, ac elementum nunc consectetur at. Vestibulum cursus aliquet fermentum. Ut fringilla ligula sed quam pharetra, sed congue metus euismod.

Mauris vel dui at lectus tincidunt finibus id ut massa. Phasellus in velit elit. Etiam eu dapibus lorem. Maecenas at tincidunt urna. Cras vulputate lobortis urna quis condimentum. Ut sit amet sodales metus, eu eleifend arcu. In sed porta elit. Duis sit amet dictum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo vitae magna eu consectetur. Vivamus faucibus vehicula dignissim. Aliquam vitae mauris lacinia, sodales ante eu, faucibus leo. Suspendisse vel sodales lacus. Aliquam erat volutpat.

Vivamus faucibus vehicula dignissim.

Integer ut ipsum eu tortor mollis accumsan nec vitae ex. Proin convallis, eros et viverra fringilla, orci purus ultricies lectus, rutrum ultrices odio nibh non odio. Quisque imperdiet elit eu suscipit suscipit. Pellentesque suscipit ex sed mattis imperdiet. Vivamus egestas tristique nisl non ornare. Duis fringilla maximus venenatis. Proin porttitor eget quam sit amet volutpat. Nulla arcu purus, lacinia id volutpat ut, tincidunt sed purus. Donec ullamcorper id lacus in placerat. Pellentesque a tortor ut mauris egestas pulvinar. Mauris laoreet sem augue, eget auctor erat semper gravida. Nulla et lectus mi. Etiam sagittis libero at lobortis tincidunt. Suspendisse sem ligula, auctor eu lacinia id, pharetra sit amet lacus. Fusce quis arcu vestibulum, pulvinar neque ultricies, gravida justo.`);

  // Encoded
  // or very simply amauiZip.response
  const response = amauiZip.encoded;

  // {
  //     "value": "10\u0000\u0000ÿ\u000e 1\u0000\u0000¿ 2\u0000\u0002Þ\u0006 3\u0000\u0000ï\n 4\u0000\u0000ï\u000b 5\u0000\u0002ÿ\u0004 6\u0000\u0002ÿ\u0005 7\u0000\u0002Þ\u0002 8\u0000\u0000¾ 9\u0000\u0002Ü\u0002  \u0000\u0000\b s\u0000\u0002 a\u0000\u0002 i\u0000\u0002¢ ,\u0000\u0002£ t\u0000\u0002² m\u0000\u0002¶ e\u0000\u0002Â r\u0000\u0002Æ n\u0000\u0002Ç `\u0000\u0002Ò g\u0000\u0002Ü\u0003 q\u0000\u0002Ý\u0002 h\u0000\u0000Ý\f \n\u0000\u0000Ý\r j\u0000\u0000Ý\u000e y\u0000\u0002Ýò z\u0000\u0002Ýó f\u0000\u0002Þ\u0007 b\u0000\u0002ß\u0002 M\u0000\u0000ß\f V\u0000\u0002ßÒ E\u0000\u0002ßÓ C\u0000\u0002ßâ D\u0000\u0002ßã A\u0000\u0002ßò w\u0000\u0002ßó l\u0000\u0002ä d\u0000\u0000ê .\u0000\u0000ë o\u0000\u0002æ p\u0000\u0000î x\u0000\u0002ï\u0004 N\u0000\u0000ï\f P\u0000\u0000ï\r I\u0000\u0000ï\u000e S\u0000\u0000ï\u000f u\u0000\u0002ò c\u0000\u0002ö v\u0000\u0000þ k\u0000\u0002ÿ\u0006 F\u0000\u0002ÿò Q\u0000\u0002ÿö L\u0000\u0000ÿþ U\u0000\u0000ÿÿ,   AAKP/+7ZqPiZ3K+ejq7cusyKqci72Lmp+6zqy+uo76qJ+Zncyb6qvcypyY7rjvyd6LmZ/qub2dybvemd2s/527jYnqi6zZz5qJ/duPndy7ucu+6p6KyruL7tnNjdvLuJ6f2Zioq5ienMqcv6m7jP3ui6yP+J7tyoq5mI6u3LrMjtu9v/mv2uuP/7yv2Iz43b2NnN/7qsvuz57tzdiry+jd74zuyZ6fm6zt3K2PmKvduYqZju6439mfy73piO6Lrf6o3crPjqmO2M+PyOye7u2Yj53Y647+zor435ncy4q6jciry+je6/vqr96YrrmP/M6p+cu/q4z9q4272/yu6azLuamPi4++u8qOjNz9yPzp3/jqju+q+Mm73pndmp+6z7n6iMzp+6z7n6iY3Ojqy7uJ/sqp3Ir9jpjMya7eyL+pyY7rjv/LmL+pyI+b74qqjem57f6/mr29+d2qjdvMmKmY7onLu6zOn57u7u7+j+zMmL+pyLm8yJ3Jyp+d6Yna/Pm7ja+6q6r96Ymcye2vj5u825y77u6OrLjp6YmZy/qcmOjLip3Om/u5i7yY+LmP3M37yo6dqsnuuN/J6fqZz63Izd76+qzr643+qpzJ/e6d3rjuyLjtvu2ZzJi9mrnK7eqMn7rPzMvYzu+e64//+4jM2uv/m7zY3bmPyoqL2LvKrKnoy4yZvemfmI+b77nLv6uJqcyd3aq46Y6Mu5yv++qMitmYrfrczPzvno/tjN/7rf64nMqJ+52M7ouP+Y6ojdvquprt6J+YuKndqpyd2q3b2M7o7sqo/dq/r8ycq+yrqp2p3YzIzP+p3O7Kjdyp7KuenY3Onf+OqP2srvm7zb+Y6eiPj7nOuMvJ+tn7mr257fr43crb3tudza/a/tuMm7zYuZm5zsmMy9zpv+6M3by72t7P7dyt7MyYuJ/qq6jt2vmZu42PndiMvN2vrvus+umO3Onf/pu6mfmYqaif2OiK2f783ercj/vK643/rb2/6u+ayqncn9rdu92v2t3d3d/J6fqZzqi9ru3s2+2ryu3si/qci7vZvKifiq7enert3vvK75ru3cnqydmOnd7N6YntrtybvNue26/43erK2d/tr9rtzM7a6tzb+s2N+Zvsq+r62+/N3qya/93pu+2brpu82e3LrNi9zpv+yryPnL+oq5m++4+ejov96Yrfzq7prpj874yKnurLnMmL7tnNjdvLu57bzJvNrIzonruo3Y//zZ7Jjc6Ojbj+rvmp/qy5rf+/2u+a7Zq56si7vZvK6479zdmZy7uszpy7rf7M2+2Z3K+erszfm82sqp3J+s/v/M3frd2ajqvPucu+vcuJ3omt+fm7zauozIz9q4vYu8qNn//6/+2+2br6+q362+6Lz8zLidjpy8qKj/vcmK64//3qjbr6iY6a76/639rtm+qai/yY6YvYzu+ejP7P+L7Z//zem/rO6439qavt35u42++qmt+v/tvtqOje+Mz63bzZ7b3qqr3NnLicuKrr7ouJqcybr474u628v675qsjY6o/dq9z9iL2LvKjLzJnu3Nz6/uzd77va39rbv++N3f7bu7u9/Z3Y3OmYvOiruN68mPid2qu6zI+66cmKif7968qeuM+PyfzLj4jLvNrsyt+t+6z/y+nJiqypm6mKjo/qv6maqcr72/6Zr9qsus35id3s3pi9ydmZ+ZiYuMvrvKrKr52bz4vcnZmfqKjtzM7JnZvt3Iz9q47czO3Pru3Zu42Y+7qZuZmLipyY6MvIrZ/rv636yvjfmdzLucu+6cuMq7qK3b2Ims/5+8rfrY74isuYnp3OqMjL2t7P7d6tz6v77/jdytjc6KuOqLqqjOqu3sirqNyKvtnLrNnPmpzpv9+YqN763Yzdys+P3pj7yo/sq8q53Mm5y77tu+vq7pq5ju2YqbnJybr474jav++dzb7b+s/96vuu6a78+46Lier96O76r4zdn8+92v2oq5i/uunru47o+c3Z//7s3frK2f6rzb7bnK/72ry+j7jou9+6zd2MyM6o6L/emJmcu7if7Kqd3Prev+rpqe3Mut+t7a+v/tzbuNqa/73pu827vcv5mc+bnK/qz/jqrfrdqsqOiaj4j+3P2KypucnIv767rMmMy7iNi93YzJq/75/pu42769y4nKmr+ajdys+Zzpv7uYu8itn9+4rfrcmb7Krsi7i47b7tmcyYna3t3tvZq9u/7P+5qbvtjYvJyZufuJ26763Ju429q+/43frN2f37vdq9jav9+rrump/vjc6f/vjfqJuvmKier96P7Z/73vqu6art/u7pu42KvK7eyL2qr82+2bre29uq36ybvemd25Aw==",
  //     "original_byte_size": 3021,
  //     "value_byte_size": 2727,
  //     "compression_ratio": 1.11,
  //     "compression_percentage": 9.73,
  //     "positive": true,
  //     "performance_milliseconds": 47,
  //     "performance": "47 milliseconds"
  // }
```

### Dev

Install

```sh
  yarn
```

Test

```sh
  yarn test
```

### Prod

Build

```sh
  yarn build
```
