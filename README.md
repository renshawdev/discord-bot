# Discord Bot

The most basic Discord bot.

Instruction for setting up a discord bot and discord.js
https://discordjs.guide/

## Hosting for free using Docker and Google Cloud Compute Engine
Instructions for hosting on Compute Engine using a container image instance.

### Prerequisites
- Bot created in a Discord application https://discord.com/developers/applications 
- Google Cloud Account and a Google Cloud Project ready to be used
- Make sure Compute Engine and Cloud Build are enabled in your project (simply visit them and click enable if prompted)
- Install the gcloud CLI tool and login `gcloud login`

### Setup and Deployment

You can either clone this repo if starting from scratch, or use an existing one (you may need to figure out what to change if your folder structure is more complicated) and follow the instructions below.

1. Create a Dockerfile (literally a file named Dockerfile) in the local folder where your bot code is.
1. Enter the following in your Dockerfile, replacing the BOT_TOKEN environment variable with your bot token.
    ```
    FROM node:12-alpine

    COPY package*.json ./
    RUN npm install
    COPY . ./

    ENV BOT_TOKEN=your-discord-bot-token

    CMD npm start
    ```
1. Make sure you have a "start" script in your package.json which will start your bot e.g. 
    ```
    "scripts": {
        "start": "node ."
    }
    ```
1. run the following gcloud command to build a Docker image using Google Cloud Build replacing project-id with your Google Cloud Project ID and image-id with whatever you want to identify your image.
    ```
    gcloud builds submit --tag gcr.io/project-id/image-id
    ```
1. Go to the Compute Engine dashboard and create a new instance.
1. Select either us-west1, us-central1, or us-east1 region and the N1 Series f1-micro Machine type to make use of the free tier.
1. Select the checkbox next to 'Deploy a container image to this VM instance' and paste the container image tag you entered previously when you built the image e.g. `gcr.io/project-id/image-id`
1. Scroll to the bottom and click 'Create'
1. You will be directed back to the dashboard and once your instance starts, your bot should log in and you should see it in your discord server.

### Updating

After updating your code and checking that it runs locally. You can run the following commands to update your Container Image and live Compute Engine instance.

1. Updating Container Image (simply run the same cloud build command as before)
    ```
    gcloud builds submit --tag gcr.io/[your-project-id]/[your-image-id]
    ```

1. Updating Compute Engine
    ```
    gcloud compute instances update-container [your-instance-name] --zone [your-instance-zone] --container-image=gcr.io/[your-project-id]/[your-image-id]
    ```

If you have any issues or further questions feel free to contact me on the Devcord or Domaincord discord servers (ask for Paul R or look for the avatar of me wearing a red cap with GEEK written on the front).
