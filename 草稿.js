#include "stdio.h"
#include<windows.h>
#include"stddef.h"
#include"string.h"
#define MAX 10
typedef struct student{               
     char name[MAX];                   
     int age;                     
     char sex[MAX];                     
     int phone;                       
     char address;                   
     int height;                     
     int email;                    
     struct student *next;            
    }stu;

typedef struct info{              
     char name[MAX];               
     int age;                 
     char sex[MAX];                    
     int phone;                    
     char address;                    
     int height;                      
     int email;                    
          
    }fstu;

stu *head;
void changexinxi(stu *x,stu *y)
{stu t;
t=*x;
*x=*y;
*y=t;
}
void xingmingzengxu()
{stu *p1,*p2;
if(head==NULL)return;
p1=p2=head;
while(p1!=NULL)
{
	p2=p1->next;
	while(p2!=NULL)
	{if(strcmp(p1->name,p2->name)>0)
	changexinxi(p1,p2);
	p2=p2->next;
	}
	p1=p1->next;

}
}

void xuehaozengxu()
{stu *p1,*p2;
if(head==NULL)return;
p1=p2=head;
while(p1!=NULL)
{
	p2=p1->next;
	while(p2!=NULL)
	{if(p1->age>p2->age)
	changexinxi(p1,p2);
	p2=p2->next;
	}
	p1=p1->next;

}
}

save()                
  {fstu a;stu *p2=head;
    FILE *fp;
        fp=fopen("student.dat","w");
    while(p2!=NULL)
    {

        strcpy(a.name,p2->name);
		a.age=p2->age;
		strcpy(a.sex,p2->sex);
		a.phone=p2->phone;
		a.address=p2->address;
		a.height=p2->height;
		a.email=p2->email;
		fwrite(&a,sizeof(fstu),1,fp);
		p2=p2->next;
        
    }
        fclose(fp);
 }

void init()
{
 int flag2=0;
   stu *p1=NULL,*p2,*p3=NULL;
 
               
   fstu a;
   FILE *fp;
        
   if((fp=fopen("student.dat","r"))==NULL)
		   if((fp=fopen("student.dat","w"))==NULL)	   { printf("Cannot open file.\n");exit(0);}
		   else	   {fclose(fp);if((fp=fopen("student.dat","r"))==NULL){printf("Cannot open file.\n");exit(0);}}
		
				
		p3=p1=p2=(stu *)malloc(sizeof(stu));
		p3->next=NULL;
		while(!feof(fp))
		{ 
				fread(&a,sizeof(fstu),1,fp);
				if(!feof(fp))
				{
				strcpy(p1->name,a.name);
				p1->age=a.age;strcpy(p1->sex,a.sex);
				p1->phone=a.phone;
				p1->address=a.address;
				p1->height=a.height;
				p1->email=a.email;
				p2->next=p1;p2=p1;p2->next=NULL;p1=(stu *)malloc(sizeof(stu));
			
				flag2=1;
				}
			}		
		if(1==flag2)head=p3;
	
		
		fclose(fp); 
}
void print()                            
    {
        system("cls");
        printf("\t\t\t学生通讯录\n");          
        printf("<1>增加学生信息\n");              
        printf("<2>显示全部学生信息\n");                     
        printf("<3>查找学生信息\n");                    
        printf("<4>保存学生信息\n");                       
        printf("<5>根据姓名删除信息\n");                  
        printf("<6>通过姓名修改信息\n");  
        printf("<7>Quit\n");                    
         }
void cin(stu *p1)                            
 { printf("Enter name:\n");
    scanf("%s",p1->name);
   printf("Enter age:\n");
     scanf("%d",&p1->age);
    printf("Enter sex:\n");
     scanf("%s",p1->sex);
   printf("Enter information:\n");
   printf("Enter phone:\n");
     scanf("%d",&p1->phone);
  printf("Enter address:\n");
    scanf("%d",&p1->address);
  printf("Enter height:\n");
   scanf("%d",&p1->height);
  printf("Enter email:\n");
   scanf("%d",&p1->email);
  }
void cindata()                          
 {  stu *p1,*p2;
   int i=1;
  char ch;
  p2=p1=head;
  if(head==NULL){p1=(stu *)malloc(sizeof(stu));head=p1;}
  else
  {
	  while(p2!=NULL){p1=p2;p2=p2->next;}
	  p2=p1;
	  p1=(stu *)malloc(sizeof(stu));
	  p2->next=p1;
  }
	p1->next=NULL;
	
  while(i)
    {
	   cin(p1);
    printf("Do you Want to Continue?yes or no");       
     fflush(stdin);
     ch=getchar();
    if(ch=='n'||ch=='N')
      { i=0;  p1->next=NULL;}
      
    else
      { p2=p1;
        p1=(stu *)malloc(sizeof(stu));
        p2->next=p1;
		p1->next=NULL;
      }
     }
   
  save();
}
void lookdata()                             
 {
     FILE *fp;fstu a;
        fp=fopen("student.dat","r");
		
    while(!feof(fp))
    {
    
        fread(&a,sizeof(fstu),1,fp);
                
		if(!feof(fp))
		{printf("Name:%s\t",a.name);
		printf("Age:%d\t",a.age);
         
         printf("Sex:%s\t",a.sex);
         printf("\n");
         printf("Phone:%d\t",a.phone);
         printf("Address:%d\t",a.address);
         printf("Height:%d\t",a.height);
         printf("Email:%d\t",a.email);
         printf("\n");
		}
    	
    }
        fclose(fp);
   }
void insert()                              
 { stu *p1,*p3,*p2;
   char ch;
   xuehaozengxu();
   p1=head;
   p3=(stu *)malloc(sizeof(stu));

    p3->next=NULL;
   if(head==NULL){ head=p3; }
   cin(p3);
   while(p1!=NULL&&(p1->age<p3->age))     
     {  p2=p1;p1=p1->next;}
   if(p2==head) {head->next=p3; }
   p2->next=p3;p3->next=p1;
   save();
   


 }

find()                              
 { stu *p2=head;
 char name[20];
   int b=0;
   printf("Enter the name of the student you want to find:");   
   scanf("%s",name);
   while(p2!=NULL)
     {if(strcmp(name,p2->name)==0)
        {
          printf("The data you want has be found\n");
          printf(" Name:%s\t",p2->name);
          printf("Age:%d\t",p2->age);
          printf("sex:%s\t",p2->sex);
          printf("\n");
          printf("Phone:%d\t",p2->phone);
          printf("Address:%d\t",p2->address);
          printf("Height:%d\t",p2->height);
          printf("Email:%d\t",p2->email);
          printf("\n");

          b=1;
        }
   p2=p2->next;
   } 
   if(b==1)
          {
            print();
            printf("Find one\n");}
   else
            {print();
             printf("Not find\n");

            }
}
void shanchu()
{
	 stu *p2=head, *p1=p2;char ch;
 char name[20];
   int b=0;
   printf("Enter the name of the student you want to find:");  
   scanf("%s",name);
   while(p2!=NULL)
     {if(strcmp(name,p2->name)==0)
        {
          printf("The data you want has be found\n");
          printf(" Name:%s\t",p2->name);
          printf("Age:%d\t",p2->age);
          printf("sex:%s\t",p2->sex);
          printf("\n");
          printf("Phone:%d\t",p2->phone);
          printf("Address:%d\t",p2->address);
          printf("Height:%d\t",p2->height);
          printf("Email:%d\t",p2->email);
          printf("\n");
		  printf("Do you want to erase it?Y Or N\n");
		  fflush(stdin);ch=getchar();
		  if(ch=='Y'||ch=='y') b=1;
		  break;
        }p1=p2;
   p2=p2->next;
   } 
   if(b==1)
          {
            p1->next=p2->next;free(p2);
            printf("Data has benn erased!\n");}
   save();
   

}
void xiugai()
{
	 stu *p2=head;char ch;
 char name[20];
   int b=0;
   printf("Enter the name of the student you want to find:");   
   scanf("%s",name);
   while(p2!=NULL)
     {if(strcmp(name,p2->name)==0)
        {
          printf("The data you want has be found\n");
          printf(" Name:%s\t",p2->name);
          printf("Age:%d\t",p2->age);
          printf("sex:%s\t",p2->sex);
          printf("\n");
          printf("Phone:%d\t",p2->phone);
          printf("Address:%d\t",p2->address);
          printf("Height:%d\t",p2->height);
          printf("Email:%d\t",p2->email);
          printf("\n");
		  printf("你想修改它吗?Y Or N\n");
		  fflush(stdin);ch=getchar();
		  if(ch=='Y'||ch=='y') b=1;
		  break;
        }
   p2=p2->next;
   } 
   if(b==1)
          {
            cin(p2);
            printf("Data has benn changed!\n");}
   save();
   

}
   
 
void denghou()
{
	printf("press any key to go to main menu\n");
	fflush(stdin);
	getchar();
}
update()                            
 {stu *p2=head;
  char name[10];                       
  int b=0;
  printf("Enter The Name");                
  scanf("%s",name);

  while(p2!=NULL)
    {if(strcmp(name,p2->name)==0)
      {
          printf("Find you data\n");
          printf("Name:%s",p2->name);
          printf("Age:%d",p2->age);
          printf("Sex:%s",p2->sex);
          printf("Phone:%d",p2->phone);
          printf("Address:%d",p2->address);
          printf("Height:%d",p2->height);
          printf("Email:%d",p2->email);
          printf("Success!");b=1;break;
  }
  p2=p2->next;}
  denghou();
        if(b==0)
        {print();
         printf("Sorry not Find data!");denghou();
         }
        else
        {
         print();
         printf("Finish!");denghou();
            }
  }

void xianshilianbiao()
{
	stu *p2=head;
	while(p2!=NULL)
     {
          
          printf(" Name:%s\t",p2->name);
          printf("Age:%d\t",p2->age);
          printf("sex:%s\t",p2->sex);
          printf("\n");
          printf("Phone:%d\t",p2->phone);
          printf("Address:%d\t",p2->address);
          printf("Height:%d\t",p2->height);
          printf("Email:%d\t",p2->email);
          printf("\n");
   p2=p2->next;
   } 
}

void shifang()
{
	stu *p2=head;
	while(p2)
	{p2=head->next;free(head);head=p2;}
}


void main()                            
{  init();

		
 int i;
  while(1)
  {
	  print();
  printf("Enter choice:");
   fflush(stdin);
   scanf("%d",&i); 
 while(i<1||i>7)
 {  printf("Enter num from 1 to 7:\n"); scanf("%d",&i); }         
          
switch(i)
  {    case 1:
          cindata(); 
          break;
       case 2:
         lookdata();   
          break;
       case 3:
          update();        
          break;
       case 4:
         save();      
          break;
       case 5:
          shanchu(); 
          break;
       case 6:
          xiugai();  
          break;         
       case 7:
           shifang(); 
		   exit(1);     
          
}
 denghou();
}
}