pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    stages {
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Running ESLint for code analysis...'
                sh 'npx eslint . && echo "Code Analysis Complete"'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Running code analysis with npm audit...'
                sh 'npm audit'
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo "Deploying application to production server (10.0.0.11)..."
                sh 'scp -r * root@10.0.0.11:/var/www/nodeapp'
                sh 'ssh root@10.0.0.11 "chmod +x \'/var/www/nodeapp/deploy.sh\'"'
                sh 'ssh root@10.0.0.11 "bash -l -c \'/var/www/nodeapp/deploy.sh\'"'
            }
        }
        
    }
    post {
        always {
            emailext(
                subject: "${currentBuild.fullDisplayName} - ${currentBuild.result}",
                body: """Build Result: ${currentBuild.result}
    Console Output:
    ${env.BUILD_URL}console
    """,
                to: "973321662@qq.com"
            )
        }
    }
}
