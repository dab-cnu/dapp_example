# dapp_example

임의의 디렉토리를 생성 후 생성된 디렉토리를 들어간다.
```
mkdir [file_name]
cd [file_name]
```

해당 디렉토리에서 트로플 프로젝트 환경을 설치한다.
```
truffle unbox pet-shop
```

모든 파일을 삽입한다.
ex) show_human 폴더 안의 contracts, migrations, src 폴더 모두를 생성한 디렉토리에 넣는다.


모든 파일을 넣은 후에 컴파일 및 배포를 한다.
```
truffle compile
truffle migrate
```

컴파일 및 배포 후 간단한 서버를 만들어 실행시킨다.
```
npm -i lite-server --save
npm run dev
```
