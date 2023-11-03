# ⏲️ 타임 매트릭스
![matrix_page](https://github.com/juhongahn/time-matrix/assets/94699082/a26231d8-0f20-4795-89ce-67f281053f9f)  

## 🌟프로젝트 소개
'타임 매트릭스'는 해야할 일에 **긴급성**과 **중요성**에 따라 우선순위를 부여해서, 주어진 업무를 효율적으로 해결하기 위해 만든 도구입니다.  
  
할 일이 산더미처럼 많은데, 긴급하지 않은 일 때문에 정작 중요한 일을 해결하지 못하거나, 해야 할 일을 까먹는 경우를 방지하기 위해 **아이젠하워의 시간관리법**에 영감을 받아 개발했습니다.  

## 🔗서비스 주소
>https://time-matrix-six.vercel.app/  

## 🌟주요 기능
### 드래그 앤 드랍
- 작성한 업무를 드래그 앤 드랍해서 원하는 보드로 옮길 수 있습니다.
  
### 완료한 일 차트
- Accomplishment 페이지에서 recharts 라이브러리를 통해 한 달 동안 완료한 일들을 라인차트로 시각화 했습니다.
- 차트 데이터를 클릭하면 완료한 일의 세부 내용을 볼 수 있습니다.

## ⛏️스택
**언어:** ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)   
  
**프론트 엔드:** ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

**백 엔드:** ![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white) ![RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=flat-square&logo=amazonrds&logoColor=white)

### 스택 도입 배경

**React Query**  
Task를 드래그 앤 드랍으로 각 보드에 저장하는 로직 특성상, 데이터의 입출력이 잦았고 클라이언트 상태와 서버 상태가 달라지는 문제가 빈번히 발생했습니다. **서버 상태와 클라이언트 상태를 일치** 시키기 위해 데이터 변경이 일어나면 최신 상태로 바꿔주는 기능이 필요했고 이에 따라 React Query를 선택하게 됐습니다.
  
**bun.js**  
데이터 입출력 서버용 자바스크립트 런타임 환경을 고려하던중 최근 릴리즈된 bun.js를 알게 됐습니다. 새로운 기술을 프로젝트에 사용해보고 싶은 마음이 있었고, 비교 대상인 npm과는 설치속도가 최대 30배까지 나며,  node.js에서 제공하는 파일 입출력, 테스트 등 많은 면에서 bun.js가 빠르다는 점에서 bun.js를 선택하게 됐습니다. 

## 🌟아이젠하워 매트릭스란?
아이젠하워 매트릭스는 미국 대통령 아이젠하워가 긴급성(Urgency)과 중요도(Importance)에 따라 업무를 체계적으로 정리할 수 있도록 고안한 방법으로, 가장 중요한 업무의 우선순위를 효과적으로 지정할 수 있도록 해주는 도구입니다.
![time_matrix](https://github.com/juhongahn/time-matrix/assets/94699082/5f3458c1-4fc2-4082-a822-208779d2eb37)
### 각 사분면 설명
- 1 사분면(Urgent and Important)  
제1 사분면은 ‘당장 해야 할 일’ 사분면이며, 여기에 긴급하면서 중요한 모든 작업을 배정합니다.
- 2 사분면(Less urgent, but important)  
제2 사분면은 ‘계획해야 할 일’ 사분면으로, 긴급하지는 않지만 중요한 업무를 배정합니다.
- 3 사분면(Urgent, but less important)  
제3 사분면은 ‘위임할 일’ 사분면이며, 긴급하지만 중요하지는 않은 모든 업무를 배정합니다. 때문에 다른 사람에게 위임할 수 있습니다.
- 4 사분 (Neither urgent not important)  
제 4 사분면은 긴급하지도 중요하지도 않은 업무를 배정하는 곳으로 삭제해야할 업무입니다.



