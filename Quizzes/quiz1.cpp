#include <iostream>
#include <fstream>
#include <vector>
#include <string>

using namespace std;

int main()
{
	string answer, name, fileName;
	vector<string> answers;
	vector<string> questions = {"What is a preprocessor directive?",
	"Using the header file #include <iostream> allows you to use what statement?",
	"What does the statement 'Using namespace std' allows you to do?",
	"Where does a program start?",
	"What is the 'stream insertion operator'?",
	"How is an escape sequence stored in memory?",
	"What is the largest number a short int can hold?",
	"When declaring a char variable, how is the character enclosed?",
	"What do you need to use string variables?",
	};

	cout << "What is your name?" << endl;
	cin >> name;
	fileName = "Quizzes\\Answers\\" + name + "quiz1.xls";
	ofstream answerFile(fileName);
	
	answerFile << "Question: " << "\t" << "Answers: " << endl;
	cin.ignore();
	for(int i = 0; i < questions.size(); i++){
		cout << questions[i] << endl;
		getline(cin, answer);
		answers.push_back(answer);
		answerFile << questions[i] << "\t" << answers[i] << endl;
	}
	
 	cout << endl << endl;
 	return 0;
}

