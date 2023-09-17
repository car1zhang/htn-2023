import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <main className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Inspiration</h1>
        <p>
          Every student knows that feeling of utter panic when you're in your 8AM lecture, severely sleep deprived and blanking out...what did the prof just say? I guess we'll never know. Based on our highly researched data, we concluded quickly that students nowadays are some of the most easily distracted students to have existed in student kind (in fact, most students didn't even finish our survey). At Hack the North, inspired by some of the universal problems that students face, we wanted to develop a tool to revolutionize the way we learn and take notes.
        </p>

        <h2 className="text-2xl font-bold mt-8">What it does</h2>
        <p>
          KeyNote is a powerful note-taking device paired with a web-app that leverages AI to expand the lesson beyond the lecture. Think, the best friend that'll always share their notes and answer the questions that you have from class. All users must do is record the lecture through our device, controlling it through the "Start/Stop" buttons. Then, KeyNote will process the transcript, and provide a summary of key concepts taken from the lecture, as well as the option to ask lecture-specific questions through our chat feature-- all previous transcripts being available through our curated calendar!
        </p>

        <p>
          KeyNote allows students to not only review and ask about their lecture, but they can make their own annotations and edits on top of the key concepts, just as they would on paper. There are additional features allowing users to add, delete and modify the notes, giving students the power over their own learning.
        </p>

        {/* Add similar formatting for other sections */}
        
        <h2 className="text-2xl font-bold mt-8">What's next for Keynotes</h2>
        <p>
          Looking ahead, some of the immediate additions we would like to make to KeyNotes would be adding an additional feature to allow users to jump to specific parts of the transcript based on their notes and questions. We would also love to explore some of Cohere’s other features such as ReRank, in order to make KeyNote a more personalized and efficient platform.
        </p>
      </main>
    </div>
  );
};

export default Docs;
