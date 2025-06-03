# Basic Pin Bot


Usage paths:

` npm i `

` npm start `

To enter bot settings, create an .env file, there is an example ` .env ` file named **.env-example** in the project.

```
TOKEN = 
BOT_ID = 
PREFIX = 
MONGO_URI = 
```

Create ` config.json ` file and set permission settings:
```json
{
    "isRandomPfp": true,  // Random PP 
	"randomPfpChannel": "", // ChannelID
	
	
	
	"pointBlockedCategories": [],
	"pointBlockedChannels": [],
	
	// Message Guard
	"allowedUsers": [],
	"allowedCategoryIds": [],
	"allowedChannelIds": []
}
```

### contents:
| command | comment | situation |
| ------ | ------ | ------ | ------ |
| **top** | Shows Top 10 user | stable |
| **me** | Shows points | stable |
| **sesgir** | Bot voice connected | stable |
| **sescik** | Bot voice disconnected | stable |

### events:
| name | comment | situation |
| ------ | ------ | ------ | ------ |
| **Message Guard** | Prevents messages from being written to all channels except specified channels and categories. | stable |
| **Random Pfp** | When users change their profile, they post it to the channel | stable |
| **Point System** | Users earn points for every photo they post. | stable |
