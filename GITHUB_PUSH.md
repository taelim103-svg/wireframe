# GitHub 푸시 가이드

## ✅ Git 저장소 초기화 완료

Git 저장소가 초기화되었고 모든 파일이 커밋되었습니다.

## GitHub에 푸시하기

### 방법 1: GitHub 웹사이트에서 저장소 만들기 (추천)

1. **GitHub 웹사이트 접속:**
   - https://github.com 접속
   - 로그인

2. **새 저장소 생성:**
   - 우측 상단의 "+" 아이콘 클릭
   - "New repository" 선택
   - 저장소 이름 입력 (예: `admin-web` 또는 `wireframe`)
   - "Public" 또는 "Private" 선택
   - "Initialize this repository with a README" 체크하지 않기
   - "Create repository" 클릭

3. **저장소 URL 확인:**
   - 생성된 저장소 페이지에서 URL 복사
   - 예: `https://github.com/your-username/repository-name.git`

4. **원격 저장소 추가 및 푸시:**
```bash
cd /Users/isc010250/Desktop/wireframe
git remote add origin https://github.com/your-username/repository-name.git
git push -u origin main
```

### 방법 2: GitHub CLI 사용

1. **GitHub CLI 설치:**
```bash
brew install gh
```

2. **로그인:**
```bash
gh auth login
```

3. **저장소 생성 및 푸시:**
```bash
cd /Users/isc010250/Desktop/wireframe
gh repo create admin-web --public --source=. --remote=origin --push
```

## 현재 상태

✅ Git 저장소 초기화 완료
✅ 모든 파일 커밋 완료
✅ main 브랜치 생성 완료
⏳ 원격 저장소 설정 필요

## 다음 단계

1. GitHub에서 저장소를 만듭니다
2. 저장소 URL을 복사합니다
3. 아래 명령어를 실행합니다:

```bash
git remote add origin <저장소-URL>
git push -u origin main
```

## 저장소 URL 형식

- HTTPS: `https://github.com/username/repository-name.git`
- SSH: `git@github.com:username/repository-name.git`

