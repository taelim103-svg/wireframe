#!/bin/bash

# GitHub 저장소 URL 입력 받기
echo "GitHub 저장소 URL을 입력하세요:"
echo "예: https://github.com/username/repository-name.git"
read -r REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "오류: 저장소 URL이 입력되지 않았습니다."
    exit 1
fi

# 원격 저장소 추가
echo "원격 저장소를 추가하는 중..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# 푸시
echo "GitHub에 푸시하는 중..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 성공적으로 GitHub에 푸시되었습니다!"
    echo "저장소 URL: $REPO_URL"
else
    echo "❌ 푸시 중 오류가 발생했습니다."
    echo "저장소가 존재하는지 확인하고, 접근 권한을 확인하세요."
    exit 1
fi

