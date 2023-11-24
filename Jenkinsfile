#!groovy
pipeline {
    agent any

    environment {
        REMOTE_SERVER_IP = '192.168.88.82'
        REMOTE_SERVER_USERNAME = 'serg'
        REMOTE_SERVER_SSH_CREDENTIALS = 'your-ssh-credentials-id'  // Идентификатор учетных данных для SSH-ключа
    }

    stages {
        stage('Get project from the Github') {
            steps {
                script {
                    // Проверка наличия папки проекта
//                     def projectDirExists = sh(script: "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'test -d /home/serg/frontend && echo true || echo false'", returnStatus: true)
//                     def isNotEmpty = sh(script: "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'ls -A /home/serg/frontend 2>/dev/null && echo true || echo false'", returnStatus: true)
//                     // Если папка проекта существует, выполнить git pull, иначе git clone
//                     if (isNotEmpty) {
//                         sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'cd /home/serg/frontend && git pull'"
//                     } else {
//                         sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'git clone https://github.com/Sadaaaaa/miracle-frontend.git /home/serg/frontend'"
//                     }
                    // Если директория не пуста или не существует, выполнить git pull
                    sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'cd /home/serg/frontend && git pull' || git clone https://github.com/Sadaaaaa/miracle-frontend.git /home/serg/frontend"
                }
            }
        }

        stage('Build the new docker image') {
            steps {
                script {
                sshagent([REMOTE_SERVER_SSH_CREDENTIALS]) {
                    // Сборка Docker-образа
                    sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'docker-compose stop && cd /home/serg/frontend && docker build -t miracle-frontend:latest .'"
                    }
                }
            }
        }

        stage('Start docker-compose service') {
            steps {
                script {
                    // Сборка и развертывание Docker на удаленном сервере
                    sshagent([REMOTE_SERVER_SSH_CREDENTIALS]) {
                        sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'docker-compose stop && docker-compose up --build -d'"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}
