@AGENTS.md

# PR Workflow

PR作成後は必ず以下を実施すること。

## 1. Slack通知

PRを作成したら、下記チャンネルに新規スレッドで投稿する。
- **チャンネル**: C07GLRQS477
- **メンション**: `<@UFU54AXQX>`（Slack の書式。`@` を忘れずに）
- **内容**: 確認依頼・対象IssueのNo.・PRリンク

## 2. Before/After スクリーンショット

UIに変更がある場合、PR作成時にスクリーンショットを撮影してPRコメントに掲載すること。

- **撮影スクリプト**: `scripts/screenshot.mjs`（`.gitignore` 済み・コミット不可）
  ```bash
  # ログイン不要ページ
  PATH="$HOME/.nvm/versions/node/v22.16.0/bin:$PATH" node scripts/screenshot.mjs /terms/seeker before.png
  # ログインが必要なページ（自動でログインして撮影）
  PATH="$HOME/.nvm/versions/node/v22.16.0/bin:$PATH" node scripts/screenshot.mjs /profile/preview after.png
  ```
  - 認証情報・API キーは `scripts/screenshot.mjs` 内に記載（`.gitignore` 済み）
- スクリーンショットは **リポジトリのツリーに含めない**（`docs/screenshots/` 等のディレクトリをコミットしない）
- imgBB の無料 API で画像をアップロードして URL を取得し、PRコメントに埋め込む：
  ```bash
  URL=$(curl -s -X POST "https://api.imgbb.com/1/upload" \
    --form "key=$(cat .imgbb-key)" \
    --form "image=@/path/to/image.png" | \
    python3 -c "import sys,json; print(json.load(sys.stdin)['data']['url'])")
  ```

## 3. PRのスコープ管理

PRには対象Issueに直接関係する変更のみを含めること。
- `.gitignore` の修正・依存関係の更新・リファクタなどスコープ外の変更は別PRで対応する
- **`dev` への直接 push は禁止。必ず PR 経由でマージすること。**
