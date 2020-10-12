# DraftJs + NextJs + Typescript RichTextEditor

This project is using draft-js, hooks and context API to create a simple, reusable RichTextEditor for a React application using material-ui.

## Development
To run this project you will need to have `node: >=10` installed on your machine. It probably won't run if you have a previous version installed.

- Clone or fork this repo.
- Instal dependencies - you can run `yarn` or `npm i` to install all dependencies.
- Run `yarn dev` or `npm run dev` to start your development server.

<small>
**NOTE** - If you want to be able to upload images to cloudinary you will have to create a file called `.env.local` at the root of this project. Once you created this file, you will have to add the following:
</small>


```
CLOUDINARY_CLOUD=<cloudinary-cloudname>
CLOUDINARY_KEY=<cloudinary-api-key>
CLOUDINARY_SECRET=<cloudinary-secret>
CLOUDINARY_PRESET=<upload-preset-name> 
 ``` 
<small>
 For `CLOUDINARY_PRESET`you have to create an unsigned upload preset from your cloudinary project settings.
</small>

### TODO
- [x] Create inline styles
- [x] Create block styles
- [x] Make inline styles toolbar appear when selected text
- [x] Add link to content from inline styles toolbar
- [x] Embed youtube videos and tweets  
- [x] Upload images to CLoudinary
- [x] Add loading placeholder when uploading images
- [x] Remove media files on button click 
- [ ] Figure out bug when testing a regex on _handlePastedText
- [ ] Create HiddenInput component for file uploads
- [ ] Add caption with its own placeholder for images or maybe all atomic blocks
- [ ] Save to backend
- [ ] Hanlde removing images the were uploaded while editing but did not get saved to backend
