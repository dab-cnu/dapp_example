ref : https://opentutorials.org/course/2869/20679


사설 서버 구축
```
geth --networkid 4649 --nodiscover --maxpeers 0 --datadir "c:\ethereum\data" --mine --minerthreads 1 --rpc --rpcaddr "0.0.0.0" --rpcport 8545 --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --unlock 0,1
```

remix를 통해 스마트 컨트랙트 생성 및 배포
remix link : http://remix.ethereum.org/

임의의 디럭토리 생성 및 이동
```
mkdir [dir_name]
cd [dir_name]
```

이동 후 해당 모든 폴더 삽입

프로젝트 환경 구축 후 실행
```
npm install
node app.js
```
