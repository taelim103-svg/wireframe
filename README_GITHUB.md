# 🚀 GitHub 푸시 가이드

## ✅ 준비 완료!

Git 저장소가 초기화되었고 모든 파일이 커밋되었습니다.

## GitHub에 푸시하기

### 방법 1: GitHub 웹사이트에서 저장소 만들기 (가장 쉬움) ⭐

1. **GitHub 웹사이트 접속:**
   - https://github.com 접속
   - 로그인

2. **새 저장소 생성:**
   - 우측 상단의 "+" 아이콘 클릭
   - "New repository" 선택
   - 저장소 이름 입력 (예: `admin-web` 또는 `wireframe`)
   - "Public" 또는 "Private" 선택
   - ⚠️ "Initialize this repository with a README" 체크하지 않기 (이미 파일이 있음)
   - "Create repository" 클릭

3. **저장소 URL 복사:**
   - 생성된 저장소 페이지에서 URL 복사
   - 예: `https://github.com/your-username/repository-name.git`

4. **터미널에서 푸시:**
```bash
cd /Users/isc010250/Desktop/wireframe
git remote add origin https://github.com/your-username/repository-name.git
git push -u origin main
```

### 방법 2: 스크립트 사용

저장소 URL을 알려주시면 자동으로 푸시할 수 있습니다:

```bash
./push-to-github.sh
```

저장소 URL을 입력하면 자동으로 푸시됩니다.

## 현재 상태

✅ Git 저장소 초기화 완료
✅ 모든 파일 커밋 완료 (2개 커밋)
✅ main 브랜치 생성 완료
⏳ 원격 저장소 설정 필요

## 커밋 내역

1. Initial commit: Admin web interface with order management
2. Add deployment guides and GitHub push script

## 다음 단계

1. **GitHub에서 저장소를 만듭니다**
2. **저장소 URL을 복사합니다**
3. **아래 명령어를 실행합니다:**

```bash
git remote add origin <저장소-URL>
git push -u origin main
```

또는 스크립트를 사용:

```bash
./push-to-github.sh
```

## 저장소 URL 예시

- HTTPS: `https://github.com/username/repository-name.git`
- SSH: `git@github.com:username/repository-name.git`

## 문제 해결

### 권한 오류
- GitHub에 로그인되어 있는지 확인
- 저장소 접근 권한 확인

### 저장소가 이미 존재하는 경우
- 저장소 이름 변경
- 또는 기존 저장소와 병합

### 푸시 오류
```bash
git remote -v  # 원격 저장소 확인
git remote remove origin  # 원격 저장소 제거
git remote add origin <새-저장소-URL>  # 새로운 원격 저장소 추가
git push -u origin main  # 다시 푸시
```

