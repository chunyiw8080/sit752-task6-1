pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    stages {
        stage('Deploy to Staging') {
            steps {
                echo "Deploying application to production server (10.0.0.11)..."
                sh 'scp -r * root@10.0.0.11:/var/www/nodeapp'
                sh 'ssh root@10.0.0.11 "chmod +x \'/var/www/nodeapp/deploy.sh\'"'
                sh 'ssh root@10.0.0.11 "bash -l -c \'/var/www/nodeapp/deploy.sh\'"'

            }
        }
    }
}
