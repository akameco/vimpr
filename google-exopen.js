// INFO {{{
let PLUGIN_INFO = xml`
<VimperatorPlugin>
<name>google-exopen</name>
<description>useful in google search</description>
<description lang="ja">openを拡張し前回のGoogle検索クエリを入力済みにする</description>
<author>akameco</author>
<license>New BSD License</license>
<version>0.1</version>
</VimperatorPlugin>`;
// }}}

(function () {
    let original = mappings.getDefault(modes.NORMAL, 'o');

    mappings.addUserMap(
      [modes.NORMAL],['o'],':open',
      function() {
        // urlを取得
        let url = window.content.window.location;
        // google検索か判定
        if(url.host !== 'www.google.co.jp') {
          return original.action.apply(this, arguments);
        }

        // クエリ部の抜き出し
        let q = url.href.match(/[?&]q=(.*?)&/);
        // foo+bar+hogeの形で取得されるので'+'を' 'で置き換え
        let commandPram = decodeURIComponent(q[1]).replace(/\+/g,' ');

        // コマンドの生成
        let command = 'open ' + commandPram;
        commandline.open('',
          commands.commandToString({command: command}),modes.EX);
      }
    );
})();

// vim:sw=2 ts=2 et si fdm=marker:
