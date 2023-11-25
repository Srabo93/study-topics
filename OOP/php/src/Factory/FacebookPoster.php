<?php

namespace Armin\Php\Factory;

use Armin\Php\Factory\SocialNetworkConnector;

class FacebookPoster extends SocialNetworkPoster
{
    public function __construct(private string $login, private string $password)
    {
    }

    public function getSocialNetwork(): SocialNetworkConnector
    {
        return new FacebookConnector($this->login, $this->password);
    }
}
