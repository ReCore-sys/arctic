import os
import py7zr
import shutil

if "Arctic.7z" in os.listdir():
    os.remove("Arctic.7z")
if "build" in os.listdir():
    shutil.rmtree("build")
if "Arctic" in os.listdir():
    shutil.rmtree("Arctic")
print("Compiling...")
os.system("go build -ldflags -H=windowsgui")
print("Adding icon")
os.system("rcedit ./arctic.exe --set-icon ./onbuildfiles/bear.ico")
print("Creating folder")
os.system("mkdir build")
print("Copying files")
shutil.move("./arctic.exe", "./build/arctic.exe")
for x in os.listdir("./onbuildfiles"):
    shutil.copyfile("./onbuildfiles/" + x, "./build/" + x)
print("Compressing")
with py7zr.SevenZipFile("./Arctic.7z", mode='w') as z:
    z.writeall("./build", "./")
shutil.rmtree("./build")
print("Done!")
