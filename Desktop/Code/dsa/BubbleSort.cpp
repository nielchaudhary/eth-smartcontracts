#include<iostream>
#include<vector>
using namespace std;

void bubbleSort(vector<int>& arr){
    int n = arr.size();
    for(int i=n-1;i>=0;i--){
        for(int j = 0;j<=i-1;j++){
            if(arr[j]>arr[j+1]){
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
          }
        }
    }
}

int main(){
    int n;
    cin >> n;
    vector<int> arr(n);
    for(int i = 0; i < n; i++){
        cin >> arr[i];
    }

    bubbleSort(arr);

    for(int i = 0; i < n; i++){
        cout << arr[i] << " ";
    }

    return 0;
}
