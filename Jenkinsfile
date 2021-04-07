pipeline {
  agent any
  environment {
    LHCI_BUILD_CONTEXT__CURRENT_BRANCH = "${env.BRANCH_NAME}"
    LHCI_BUILD_CONTEXT__EXTERNAL_BUILD_U = "${env.BUILD_URL}"
    SCANNER_QUBE_HOME = tool 'SonarQubeScanner'
    AWS_CARBON8_IP = credentials('AWS_CARBON8_IP')
    CURRENT_WORKSPACE = "${env.WORKSPACE}"
    OWNER = "9thWonder"
    PR_INDEX = env.BRANCH_NAME.replace('PR-', '')
    REPO = "c8starter"
    // Noti for Group
    OFFICE365_WEBHOOK = credentials('1874cd82-e930-4d9c-9a47-2fc633333320')
    // Noti for tech leads
	  TECH_LEAD_OFFICE_WEBHOOK = credentials('584c84af-6162-4d3e-a364-0e9e29545773')
    GIT_EMAIL_COMMIT = sh(script: "git --no-pager show -s --format='%ae'", returnStdout: true).trim()
  }
  options { 
    disableConcurrentBuilds() 
  }
  stages {
    stage('Sonarqube Analysis') {
      when {
        anyOf {
          branch 'html'
          allOf {
            environment name: 'CHANGE_TARGET', value: 'html'
            branch 'PR-*'
          }
        }
      }
      steps {
        script {
          withSonarQubeEnv("9thWonder SonarQube") {
            sh "${SCANNER_QUBE_HOME}/bin/sonar-scanner"
          }
          def qg = waitForQualityGate()
          if(qg.status != "OK"){
            echo "${qg.status}"
            error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
          }
        }
      }
    }
    stage("Scan with lighthouse CI") {
      when {
        branch 'html'
      }
      steps {
        script{
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
            env.LHCI_BUILD_CONTEXT__ANCESTOR_HASH = env.GIT_COMMIT
          }                  
        }
        echo "${env.LHCI_BUILD_CONTEXT__COMMIT_MESSAGE}"
        sh 'lhci autorun'
      }
    }
  }
  post {
    failure {        
      script {            
        // Noti for Group
        office365ConnectorSend(webhookUrl: "${OFFICE365_WEBHOOK}", color:'#87ab63',  message: "\n\r###Build Failed : <http://3.15.95.119/app/projects/c8starter/dashboard>")
        // Noti for tech leads
        office365ConnectorSend(webhookUrl: "${TECH_LEAD_OFFICE_WEBHOOK}", color:'#FF0000',  message: "${env.GIT_EMAIL_COMMIT} FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) \n Commit: ${env.GIT_COMMIT}", status: 'FAILED')
      }
    }
  }
}