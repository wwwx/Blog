<?php
    
    if(isset($_POST['username'])&&isset($_POST('password'))) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $info = '';
        if ($username == 'admin' && $password == '123') {
            $info = 'success';
        } else {
            $info = 'error'
        }

        if ($info == 'success') {
            $result = '<span style="color: green;">'.$info.'</span>';
        } else {
            $result = '<span style="color: red;">'.$info.'</span>';
        }
        echo $result;
    }

    echo 'hello'

?>