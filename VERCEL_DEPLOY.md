# Vercel 배포 문제 해결 가이드

## 현재 상황
- ✅ GitHub에 푸시 완료
- ❌ Vercel 자동 배포가 안 됨

## 해결 방법

### 방법 1: Vercel 웹사이트에서 GitHub 연동 확인 (추천)

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속
   - 로그인

2. **프로젝트 확인**
   - 대시보드에서 `wireframe` 프로젝트가 있는지 확인
   - 없다면 "New Project" 클릭

3. **GitHub 저장소 연동**
   - "Import Git Repository" 클릭
   - `taelim103-svg/wireframe` 저장소 선택
   - "Import" 클릭

4. **프로젝트 설정 확인**
   - Framework Preset: **Vite** (자동 감지)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./` (기본값)

5. **Deploy 클릭**
   - 설정 확인 후 "Deploy" 클릭
   - 배포 완료까지 대기

6. **자동 배포 활성화**
   - 프로젝트 설정 → Git
   - "Production Branch"가 `main`으로 설정되어 있는지 확인
   - 이후 `main` 브랜치에 푸시할 때마다 자동 배포됨

### 방법 2: Vercel CLI로 수동 배포

1. **Vercel CLI 로그인**
```bash
cd /Users/isc010250/Desktop/wireframe
npx vercel login
```
   - 브라우저가 열리면 로그인

2. **프로덕션 배포**
```bash
npx vercel --prod
```

### 방법 3: GitHub Actions로 자동 배포 (선택사항)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 자동 배포가 안 되는 일반적인 원인

1. **Vercel 프로젝트가 GitHub 저장소와 연동되지 않음**
   - 해결: Vercel 웹사이트에서 저장소 연동

2. **프로젝트가 생성되지 않음**
   - 해결: Vercel에서 새 프로젝트 생성

3. **Production Branch 설정이 잘못됨**
   - 해결: 프로젝트 설정 → Git → Production Branch를 `main`으로 설정

4. **빌드 오류**
   - 해결: Vercel 대시보드에서 배포 로그 확인

## 빠른 확인 방법

1. Vercel 대시보드 접속: https://vercel.com
2. 프로젝트 목록 확인
3. `wireframe` 프로젝트가 있는지 확인
4. 없다면 "New Project"로 생성
5. 있다면 최근 배포 내역 확인

## 배포 후 확인

배포가 완료되면:
- Vercel에서 제공하는 URL로 접속
- 변경 사항이 반영되었는지 확인
- LNB 토글 기능 테스트
- 주문 상세 히스토리 패널 비율 확인

