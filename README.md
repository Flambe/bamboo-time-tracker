# bamboo-time-tracker

## Install

To install:

1. Ensure that you have NodeJS installed (https://github.com/creationix/nvm)

2. Run: ```npm i -g @steveaxtmann/bamboo-time-tracker```

Then you can run it with:

```btt```

## Time format

When btt asks you for a time, you can copy it straight from bamboo. E.G. `6h 24m`

## Commands

### time

Usage: ```btt time```

Enter your times for the week up to today. btt will tell you when you can leave

### total

Usage: ```btt total```

Enter as many times as you need. btt will tell you when you can leave, counting each time entered as a full day of work

### save

Usage: ```btt save```

Enter as many times as you need, **NOT** including today. These times will be used when running the `today` command

### append

Usage: ```btt append```

Append another day onto the currently saved times

### today

Usage: ```btt today```

Show how much time you have left today, including all days saved with the `save` command

### clear

Usage: ```btt clear```

Clears all saved days
