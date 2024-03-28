# Introduction 
Cassava chip นี้เป็นส่วนที่ให้บริการในส่วนของการรับข้อมูลและแสดงผลกับ USER(UI) โดยการทำหน้าที่รับข้อมูล queue information ที่สร้างขึ้นจากระบบ SAP Feedmill ผ่านการอ่านค่าด้วย QR Code และการลงผลจาก User แล้วส่งผลให้ cassava_serv ทำการทำนายค่าทรายที่อยู่ในฝุ่นมันเส้น และแสดงผลให้ User ที่หน้า UI นี้ 

# Getting Started
1.	Installation process
    
    - Create React project:

            npm create vite@latest

2.	Software dependencies

        Linux/Ubuntu
        Docker container
        Node js

3.	Latest releases

        https://betagro-dev@dev.azure.com/betagro-dev/D2023-006-QI-Inspection/_git/CASSAVACHIP-FE

4.	API references

# Build and Test

## Create Images

    docker build -t cassava_app:latest .

## Run Images

    docker run -d -p 8001:8001 --name cassava_app cassava_app:latest


# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)