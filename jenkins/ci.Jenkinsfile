pipeline {
  agent {
    docker {
      label 'docker'
      image 'node:12'
    }
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install packages') {
      steps {
        sh 'yarn'
      }
    }

    stage('Lint') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
  }
}
