// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  projects: [

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure', //off, on, retain-on-failure
       // ...devices['iPhone 11']
      }
    }
    ,
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        video:'off',//'retain-on-failure',
        screenshot: 'on', //'only-on-failure' , 'on-first-failure','off'
        trace: 'retain-on-failure', //off, on, retain-on-failure
        viewport: {width:1020,height:780}

      }
    }

  ]

});

module.exports = config;

