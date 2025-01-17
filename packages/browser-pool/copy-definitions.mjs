import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const files = [
    'puppeteer/puppeteer-proxy-per-page.d.ts',
];

for (const file of files) {
    copyFileSync(
        join('src', file),
        join('dist', file),
    );
}

const copyFolderSync = (from, to) => {
    mkdirSync(to);

    for (const file of readdirSync(from, { withFileTypes: true })) {
        if (file.isDirectory()) {
            copyFolderSync(join(from, file.name), join(to, file.name));
        } else if (file.isFile()) {
            copyFileSync(join(from, file.name), join(to, file.name));
        }
    }
};

copyFolderSync('tab-as-a-container', 'dist/tab-as-a-container');
