import React from 'react';
import Card, { CardHeader } from './Card';
import { Globe, UploadCloud, Link2 } from 'lucide-react';

const SharePage: React.FC = () => {
  return (
    <div className="animate-fadeInUp">
      <Card>
        <CardHeader icon={<Globe size={20} />}>Get a Sharable Link for Your App</CardHeader>
        <div className="space-y-6 text-black dark:text-white">
          <p className="text-sm">
            To use this app on any device with a link, you need to put its files on the internet. This is called "hosting".
            Here’s the easiest, free way to do it using a service called Netlify.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold">1</div>
              <div>
                <h3 className="font-bold">Gather Your Project Files</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  On your computer, find the folder that contains all the application files. It will include <strong>index.html</strong>, <strong>App.tsx</strong>, and folders like <strong>components</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold">2</div>
              <div>
                <h3 className="font-bold">Go to Netlify Drop</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Click the link below to open the Netlify Drop website. It’s a simple drag-and-drop tool.
                </p>
                <a 
                  href="https://app.netlify.com/drop" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Open Netlify Drop
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold">3</div>
              <div>
                <h3 className="font-bold">Drag & Drop Your Folder</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Drag your entire project folder from your computer and drop it onto the area on the Netlify page.
                </p>
                <div className="mt-3 p-6 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl text-center">
                  <UploadCloud className="mx-auto w-10 h-10 text-neutral-400 dark:text-neutral-500" />
                  <p className="mt-2 text-sm text-neutral-500">Drop your site folder here</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold">4</div>
              <div>
                <h3 className="font-bold">Done! Get Your Link</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  That's it! Netlify will automatically build your app and give you a unique, public URL. You can use this link anywhere and share it with anyone.
                </p>
                <div className="mt-3 p-4 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-lg flex items-center space-x-3">
                    <Link2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">your-unique-name.netlify.app</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
};

export default SharePage;
