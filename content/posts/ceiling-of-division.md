---
title: 割り算をして商を切り上げた値がほしい
date: "2023-07-05T23:27:10.742+09:00"
description: 割る数 -1 を割られる数に足す。
image:
published: true
---

Rust で[ABC302 の A 問題](https://atcoder.jp/contests/abc302/tasks/abc302_a)を解いていて、割り算をして商を切り上げた値がほしくなった。

Ruby なら以下のように書いていた。
```ruby
a = 3
b = 2

(a / b.to_f).ceil
```

Rust で同じロジックで書こうとするとこうなる。
```Rust
let a: i32 = 3;
let b: i32 = 2;

(a as f64 / b as f64).ceil() as i32;
```
型変換が多くて大変。

剰余があるときに商を 1 足すことはできる。
```rust
let (div, rem) = (a / b, a % b);
let ceil;
if rem == 0 { ceil = div } else { ceil = div + 1 }
```
でも、あんまり `if` 書きたくないなあ。

他の人の提出を見ていたら、こんなふうに書いてる人が多かった。
```rust
(a + b - 1)/ b;
```
割る数 - 1 を割られる数に足している。

もともと割り切れる場合は、割る数 - 1 を足しても、商の数は変わらない。

余りがある場合は、余りは 1 以上なので、割る数 - 1 を足すと商が 1 大きくなって切り上げの値になる。

なるほど、言われてみればたしかに！

このあたりは、num-integer を使うことでも書ける。
`div_rem` があって、
```rust
let (div, rem) = (a / b, a % b);
```
は
```rust
let (div, rem) = a.div_rem(&b);
```
と書ける。
[https://docs.rs/num-integer/latest/num_integer/trait.Integer.html#tymethod.div_rem](https://docs.rs/num-integer/latest/num_integer/trait.Integer.html#tymethod.div_rem)

また、num-integer には `divceil` というメソッドがある。
```rust
integer::div_ceil(a, b);
```
[https://docs.rs/num-integer/latest/num_integer/fn.div_ceil.html](https://docs.rs/num-integer/latest/num_integer/fn.div_ceil.html)
これがまさに欲しかったもの！

でも、競プロやる上ではメソッドを知らないこともあるので、こういう Tips を引き出しに入れておいてもいいなと思った。他の言語でも使えるしね。

ちなみに `divmod` の気持ちで Rust で余りの変数に `mod` としようとしたところ、予約語だということを学んだ。
[https://doc.rust-jp.rs/book-ja/appendix-01-keywords.html](https://doc.rust-jp.rs/book-ja/appendix-01-keywords.html)
