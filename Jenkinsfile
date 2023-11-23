pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        REMOTE_SERVER_IP = '192.168.88.82'
        REMOTE_SERVER_USERNAME = 'serg'
        JENKINS_HOME = '/var/lib/jenkins/workspace/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

//         stage('Build') {
//             steps {
//                 script {
//                     // Adjust the build command for your frontend build process
//                     sh 'npm install' // Assuming a Node.js frontend, adjust as needed
//                     sh 'npm run build' // Assuming a Node.js frontend, adjust as needed
//                 }
//             }
//         }

        stage('Build Docker Image') {
            steps {
                script {
                    // Create Docker image for frontend
                    sh "docker build -t miracle-frontend ."
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                script {
                    // Save Docker image as an archive
                    sh "docker save -o miracle-frontend.tar miracle-frontend"
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                script {
                    // Transfer the archive to the remote server
                    sshagent(['your-ssh-credentials-id']) {
                        sh "scp miracle-frontend.tar Dockerfile ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP}:/home/serg"
                    }
                }
            }
        }

        stage('Deploy on Remote Server with Docker Compose') {
            steps {
                script {
                    // Connect to the remote server and deploy the frontend container using Docker Compose
                    sshagent(['your-ssh-credentials-id']) {
                        sh "ssh ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_IP} 'cd /home/serg && docker load -i miracle-frontend.tar && docker-compose -f ${DOCKER_COMPOSE_FILE} up -d frontend'"
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
