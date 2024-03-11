//rotate the array by k places

#include<iostream>
using namespace std;


void rotateArray(int arr[], int n,int k){
    
    k = k % n;
    int temp[k];
    for(int i = 0;i<k;i++){
        temp[i] = arr[i];
        
    }

    for(int i=k;i<n;i++){
        arr[i-k] = arr[i];
    }

    for(int i=n-k;i<n;i++){
        arr[i] = temp[i - (n-k)];
    }

    

}

int main(){

    int n = 5;
    int arr[] = {1,2,3,4,5};
    int k = 13;
    rotateArray(arr,n,k);
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}