dotnet ef migrations script > _MySQL_Init_Script/init.sql
sed -i -e 's/Build started...//g' _MySQL_Init_Script/init.sql
sed -i -e 's/Build succeeded.//g' _MySQL_Init_Script/init.sql