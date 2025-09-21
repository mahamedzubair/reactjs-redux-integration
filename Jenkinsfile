
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building a new laptop....'
                sh 'mkdir -p build'
                sh 'touch build/computer.txt'
                sh 'echo "Mainborad" >> build/computer.txt'
            }
        }
    }
}
