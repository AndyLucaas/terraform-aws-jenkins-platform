#install Jenkins
sudo apt update
sudo apt install openjdk-11-jdk -y
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y

#install Docker
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
sudo usermod -aG docker jenkins

#install git
sudo apt install git -y
sudo chmod 777 /var/run/docker.sock

docker run -d  --name sonar -p 9000:9000 sonarqube:lts-community
#install trivy
sudo apt install trivy -y
