serverHost=server
serverPort=22
serverPath=/opt/test/

scp -o ConnectTimeout=30 -P $serverPort  -r * root@$serverHost:$serverPath
ssh -p $serverPort root@$serverHost "cd $serverPath && sed -i 's/\r//g' *.sh && sh install.sh"
