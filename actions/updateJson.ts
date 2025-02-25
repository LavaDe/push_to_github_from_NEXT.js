"use server";

const GITHUB_OWNER = process.env.GITHUB_OWNER;  //your-github-username
const REPO_NAME = process.env.REPO_NAME;  //your-repo-name
const FILE_PATH = "data/testData.json"; // Adjust the path
const BRANCH = "main"; // Change if using a different branch
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

export async function updateJson(newData: any) {

console.log('newData', newData);

    try {
        // 1. Get the current file SHA
        const fileResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (!fileResponse.ok) throw new Error("Failed to fetch existing file");
        const fileData = await fileResponse.json();

        // 2. Convert new data to Base64
        const updatedContent = Buffer.from(JSON.stringify(newData, null, 2)).toString("base64");

        // 3. Commit the updated file to GitHub
        const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: "PUT",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
                message: "Updated JSON file via CMS",
                content: updatedContent,
                sha: fileData.sha, // Required for updating
                branch: BRANCH,
            }),
        });

        if (!updateResponse.ok) throw new Error("Failed to update file");
        const updateData = await updateResponse.json();

        return { success: true, commitUrl: updateData.commit.html_url };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
