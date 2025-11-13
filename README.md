# 어드민 웹화면 - 주문 관리 시스템

회사에서 사용할 어드민 웹화면입니다.

## 기능

- 주문 리스트 조회
- 주문 상세 정보 확인
- 주문 히스토리 관리
- 팀 맨션 기능 (서류검수, 운영관리, md, scm, cx)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 빌드

```bash
npm run build
```

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## 프로젝트 구조

```
src/
  ├── components/      # 재사용 가능한 컴포넌트
  │   ├── Layout.tsx   # 레이아웃 컴포넌트
  │   ├── LNB.tsx      # Left Navigation Bar
  │   └── HistoryPanel.tsx  # 히스토리 패널
  ├── pages/           # 페이지 컴포넌트
  │   ├── OrderList.tsx    # 주문 리스트
  │   └── OrderDetail.tsx  # 주문 상세
  ├── types/           # TypeScript 타입 정의
  ├── data/            # 테스트 데이터
  └── App.tsx          # 메인 앱 컴포넌트
```

## 테스트 데이터

현재 5개의 테스트 주문 데이터가 포함되어 있습니다.

