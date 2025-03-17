#!/bin/bash

# タイムスタンプ生成（ファイル名に使用）
timestamp=$(date +"%Y%m%d-%H%M%S")

# テスト対象ファイル名
input_file="ut_logs/UT_testfiles_${timestamp}.txt"

# 結果出力ファイル名
output_file="ut_logs/UT_result_${timestamp}.txt"

# カウント用変数
pass_count=0
fail_count=0
total_count=0

# 失敗したテストファイル一覧
failed_tests=()

# テスト対象ファイルリスト
test_files=()

# ut_logs ディレクトリを作成 (存在しない場合)
mkdir -p ut_logs

# 引数チェック
if [ $# -eq 1 ]; then
  if [ -f "$1" ]; then
    # 引数がファイルの場合、ファイルからテストファイルリストを読み込む
    cp $1 $input_file
  else
    echo "Error: File '$1' not found."
    exit 1
  fi
else
  # /src 配下からテストファイルを検索
  find ./src -name "*.test.js" -print0 | while IFS= read -r -d $'\0' test_file; do
    echo $test_file >> $input_file
  done
fi

# テストファイル一覧を読み込み
while IFS= read -r line; do
  test_files+=("$line")
done < "$input_file"

# テスト実行
for test_file in "${test_files[@]}"; do
  # テストコードのパスを表示
  echo "Executing test: $test_file"

  # Jest でテストを実行し、結果をファイルに追加
  npx jest "$test_file" >> "$output_file" 2>&1

  # エラー終了コードをチェック
  if [ $? -ne 0 ]; then
    echo "Test failed: $test_file" >> "$output_file"
    fail_count=$((fail_count + 1))
    failed_tests+=("$test_file") # 失敗したテストファイルを追加
  else
    echo "Test passed: $test_file" >> "$output_file"
    pass_count=$((pass_count + 1))
  fi

  echo "------------------------" >> "$output_file"
  total_count=$((total_count + 1))
done

# 結果サマリーを出力
echo "------------------------" >> "$output_file"
echo "Test Summary:" >> "$output_file"
echo "  Passed: $pass_count" >> "$output_file"
echo "  Failed: $fail_count" >> "$output_file"
echo "  Total:  $total_count" >> "$output_file"

# 失敗したテストファイル一覧を出力
if [ ${#failed_tests[@]} -gt 0 ]; then
  echo "------------------------" >> "$output_file"
  echo "Failed Tests:" >> "$output_file"
  for test in "${failed_tests[@]}"; do
    echo "  $test" >> "$output_file"
  done
  # 失敗したテストファイル一覧をファイルに出力
  failed_file="${output_file##*/%.txt}_fails.txt" # 出力ファイル名生成
  echo "${failed_tests[@]}" | tr ' ' '\n' > "$failed_file"
fi

# 完了メッセージ
echo "Test execution completed. Results saved in: $output_file"