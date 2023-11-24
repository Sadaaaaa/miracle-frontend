#!groovy
// pipeline {
//     agent any
//
//     environment {
//         DOCKER_COMPOSE_FILE = 'docker-compose.yml'
//         REMOTE_SERVER_IP = '192.168.88.82'
//         REMOTE_SERVER_USERNAME = 'serg'
//         JENKINS_HOME = '/var/lib/jenkins/workspace/'
//     }
//
//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }
//
// //         stage('Build') {
// //             steps {
// //                 script {
// //                     // Adjust the build command for your frontend build process
// //                     sh 'npm install' // Assuming a Node.js frontend, adjust as needed
// //                     sh 'npm run build' // Assuming a Node.js frontend, adjust as needed
// //                 }
// //             }
// //         }
//
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     // Create Docker image for frontend
//                     sh "docker build -t miracle-frontend ."
//                 }
//             }
//         }
//
//         stage('Save Docker Image') {
//             steps {
//                 script {
//                     // Save Docker image as an archive
//                     sh "docker save -o miracle-frontend.tar miracle-frontend"
//                 }
//             }
//         }
//
//         stage('Deploy to Remote Server') {
//             steps {
//                 script {
//                     // Transfer the archive to the remote server
//                     sshagent(['your-ssh-credentials-id']) {
//                         sh "scp miracle-frontend.tar ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP}:/home/serg"
//                     }
//                 }
//             }
//         }
//
//         stage('Deploy on Remote Server with Docker Compose') {
//             steps {
//                 script {
//                     // Connect to the remote server and deploy the frontend container using Docker Compose
//                     sshagent(['your-ssh-credentials-id']) {
//                         sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'cd /home/serg && docker load -i miracle-frontend.tar && docker-compose -f ${DOCKER_COMPOSE_FILE} up -d frontend'"
//                     }
//                 }
//             }
//         }
//     }
//
//     post {
//         success {
//             echo 'Deployment successful'
//         }
//
//         failure {
//             echo 'Deployment failed'
//         }
//     }
// }


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
                        def projectDirExists = sh(script: "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'test -d /home/serg/frontend && echo true || echo false'", returnStatus: true).trim()

                        // Если папка проекта существует, выполнить git pull, иначе git clone
                        if (projectDirExists == 'true') {
                            sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'cd /home/serg/frontend && git pull'"
                        } else {
                            sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'git clone https://github.com/Sadaaaaa/miracle-frontend.git /home/serg/frontend'"
                        }
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
