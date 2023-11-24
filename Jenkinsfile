#!groovy
pipeline {
    agent any

    environment {
        REMOTE_SERVER_IP = '192.168.88.82'
        REMOTE_SERVER_USERNAME = 'serg'
        REMOTE_SERVER_SSH_CREDENTIALS = 'your-ssh-credentials-id'  // Идентификатор учетных данных для SSH-ключа
        DOCKER_IMAGE_TAG = 'miracle-frontend:latest'
    }

    stages {
        stage('Get project from the Github') {
            steps {
                script {
                    sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'rm -rf /home/serg/frontend && git clone https://github.com/Sadaaaaa/miracle-frontend.git /home/serg/frontend'"
                }
            }
        }

        stage('Build the new docker image') {
            steps {
                script {
                sshagent([REMOTE_SERVER_SSH_CREDENTIALS]) {
                    // Сборка Docker-образа
                    sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'docker-compose stop && cd /home/serg/frontend && docker build -t ${DOCKER_IMAGE_TAG} .'"
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
